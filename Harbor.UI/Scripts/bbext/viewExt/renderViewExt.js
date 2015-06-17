/*
 * renderViewExt
 *
 * Description
 *     Implements the render method for Backbone views
 *     Also adds a bindAll method to views which is a util method for _.bindAll
 *         The 'this' arg will be set to the view so it can be called like: this.bindAll(methodNames*);
 *
 * On Rendering
 *     Uses the name property of the view to find the template
 *         The name property is put there by the view construct
 *     Calls shim.render
 *          The view is placed as data on the $el: $el.data("view").
 *          So the shim has access to the view.
 *
 * [data-model] attribute
 *     An optional data-model attribute can be used to pick out a sub model from it's parent.
 *
 * onRender callback
 *     Calls an optional onRender method after rendering passing the determined model or collection
 *
 * onResolve callback
 *     Same as onRender, however, fires after all shims have resolved. Useful when needing to wait for
 *     sub templates to render for example.
 *
 * Collection rendering
 *     If the model is not defined but a collection is, the collectionRenderer will be used
 *     to do the rendering.
 *
 * Server rendering
 *     fromServer property:
 *         Adding a property to the view: fromServer: true
 *         will skip the template rendering.
 *     renderFromServer method:
 *         Uses the serverUrl to fetch the new html. Ensures the
 *         fromServer flag is set to true. Then calls the render method.
 *     serverUrl method:
 *          A serverUrl method can be defined to return a url
 *          used to fetch the new dom contents.
 */
function renderViewExt(_, $, templateCache, collectionRenderer) {
	"use strict";

	var extension = {
		bindAll: function (methodNames) {
			var args = Array.prototype.slice.apply(arguments);
			args.unshift(this);
			_.bindAll.apply(_, args);
		},

		render: function () {
			var templateFn,
			    el,
			    shims,
			    onResolve;

			if (this.fromServer !== true) {
				templateFn = templateCache.getTemplateFor(this.name);
				setModel(this, templateFn.data);
			}

			onResolve = _.bind(function () {
                    this.trigger("resolve");
                    this.onResolve && this.onResolve(this.model || this.collection);
                }, this);

            if (this.collection) {

				collectionRenderer.render(this);
				onResolve();
			} else {

				if (this.fromServer !== true) {

					el = $(templateFn(modelJSON(this.model)));

					// set the element since the template contains the root
					this.$el.replaceWith(el);
					this.setElement(el);
				}

				// add the view to the $el.data (for the shims)
				this.$el.data("view", this);

				// allow the shims to render
				shims = this.context.get("shims");
				shims.render(this.$el, this.model).then(onResolve);
			}

			this.trigger("render");
			this.onRender && this.onRender(this.model || this.collection);
			return this;
		},

		renderFromServer: function () {
			var serverUrl,
				view = this;

			this.fromServer = true;
			serverUrl = this.serverUrl();
			$.ajax({
				url: serverUrl,
				dataType: "html"
			}).then(function (response) {
				view.$el.empty().html(response);
			});
		},

		serverUrl: function () {
			throw new Error("The serverUrl method was not defined.");
		}
	};

	return {
		extend: function (proto) {
			_.extend(proto, extension);
		}
	};

	function modelJSON(model) {
		return model ? (model.toJSON ? model.toJSON() : model) : {};
	}

	// if there is a data-model attribute on the template root
	// try to get the sub model from the parent model using model[name] or model.get(name)
	function setModel(view, data) {
		var model = view.model,
		    modelAttr = data.model || data.collection,
			retModel,
			getVal;

		if (!model || !modelAttr) {
			return;
		}

		retModel = walkModel(model, modelAttr);

		if (data.model) {
			view.model = retModel;
		} else {
			view.collection = retModel;
		}
	}

	// walks the "."'s - nested models
	function walkModel(model, modelAttr) {
		// return model[modelAttr];
		var i = 0,
			curr = model,
			next = null,
			getVal,
			attr,
		    parts = modelAttr.split(".");

		for (; i < parts.length; i++) {
			attr = parts[i];
			next = curr[attr];
			if (!next && curr.get) {
				getVal = curr.get(attr);
				if (getVal) {
					next = getVal;
				}
			}
			if (!next) {
				return null;
			}
			curr = next;
		}
		return next;
	}
}

bbext.service("bbext.renderViewExt", ["_", "$", "templateCache", "bbext.collectionRenderer", bbext.renderViewExt = renderViewExt]);
