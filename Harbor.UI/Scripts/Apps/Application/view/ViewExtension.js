/*globals */
/*
* Desription:
*     Adds JST and cleanup to Backbone Views.
*
* Requires:
*     jQuery, Underscore
*
* Usage:
*     ViewExtension.extend(this); // where this is the view instance
*
* Methods:
*     bindTo(model, event, callback) - use instead of 'bind' to have the dispose() method perform cleanup.
*     JST(template, model) - returns a promise containing the html fragment result and model from the template rendering.
*     template(template) - returns the compiled template function.
*     views(name, view) [Alias: track] - a getter/setter of child/sub views cleaned up with dispose.
*     dispose() - calls undbind, remove, and cleans up items added with the bindTo and views methods.
*         If dispose is passed false as an argument, the el of the view will not be removed.
*
*/
(function ($, _) {

	var disposeSubView,
		extension;
	
	// set the template parsing to {{value}} instead of <%= value %>
	_.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };

	extension = {

		views: function (name, view) {
			if (view) {
				if (view.cid && view.cid === this.cid) {
					throw "Cannot add view as a sub view of itself.";
				}
				this._subviews[name] && disposeSubView(this._subviews[name]);
				this._subviews[name] = view;
				return view;
			}
			return this._subviews[name];
		},

		bindTo: function (model, event, callback) {
			model.bind(event, callback, this);
			this._bindings.push({ model: model, event: event, callback: callback });
		},
		
		template: function (template) {
			/// <summary>Executes the template and returns the result.</summary>
			var templateHtml,
				templateFn = ViewExtension.templates[template];
			
			if (!templateFn) {
				templateHtml = $("#" + template).html();
				if (!templateHtml) {
					throw "Template '" + template + "' not found";
				}
				templateFn = _.template(templateHtml);
				ViewExtension.templates[template] = templateFn;
			}
			return templateFn;
		},

		JST: function (template, model) {
			/// <summary>Returns a promise containing the html fragment result from the template rendering.</summary>
			var dfd = $.Deferred(),
				dfds = [],
				templateFn;

			templateFn = this.template(template);
			model = _.clone(model) || { };

			_.each(model, function (dfd, name) {
				var curryDfd;
				if (dfd && dfd.then) {
					curryDfd = $.Deferred();
					dfd.then(function (data) {
						curryDfd.resolve({
							name: name,
							result: data
						});
					});
					dfds.push(curryDfd);
				}
			});

			$.when.apply($, dfds).then(function () {
				var results = _.toArray(arguments);

				_.each(results, function (result) {
					model[result.name] = result.result;
				});

				dfd.resolve(templateFn(model), model);
			});

			return dfd.promise();
		},

		dispose: function (removeEl) {
			this.trigger("dispose");

			// remove bindings added via bindTo
			_.each(this._bindings, function (binding) {
				binding.model.unbind(binding.event, binding.callback);
			});
			this._bindings = [];

			// handle subviews if any
			if (this._subviews) {
				_.each(this._subviews, function (view) {
					disposeSubView(view);
				});
			}

			this.unbind(); // unbind bound events 
			if (removeEl !==  false) {
				this.remove(); // remove the element and element events
			}
		}
	};

	// alias views for semantics
	extension.track = extension.views;

	disposeSubView = function (view) {
		/// <summary>Tries to dispose the view using all known means.</summary>
		if (view.dispose) {
			view.dispose();
		} else {
			view.trigger && view.trigger("dispose");
			view.unbind && view.unbind();
			view.destroy && view.destroy();
			view.remove && view.remove();
		}
	};

	window.ViewExtension = {
		templates: {},
		dispose: extension.dispose,
		disposeView: disposeSubView,
		extend: function (instance) {
			var customDispose = instance.dispose;

			console.warn("ViewExtension.extend is deprecated.", instance); // jch* - remove when unused
			_.extend(instance, {
				_bindings: [],
				_subviews: {}
			}, extension);

			if (customDispose) {
				instance.dispose = customDispose;
			}
		}
	};

} (jQuery, _));