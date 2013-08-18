



// viewRenderer
// creates a view with the viewFactory
// allows for the model on the view to be a promise or contain promises
//     as properties that are resolved before rendering.
function viewRenderer (viewFactory, $) {

	return {
		render: function (name, options) {
			// create the view
			var view = viewFactory.create(name, options),
				render = function () {
					view.render();
				};

			// wait for the view to load a model
			load(view).then(render);

			return view;
		}
	};

	function load(view) {
		var dfds = [],
			model = view.model;

		if (model) {
			if (model.then) {
				dfds.push(model);
			} else {
				$.each(model, function (name, prop) {
					if (prop && prop.then) {
						dfds.push(prop.then(function (val) {
							model[name] = val;
						}));
					}
				});
			}
		}

		return $.when.apply($, dfds);
	}
}

context.module("bbext").service("viewRenderer",
	["viewFactory", "$", viewRenderer]);


// app
// call app.render() in the app start callback to render the root app view.
function bbextapp($, appName, templateRenderer) {
	var appView;
	
	return {
		name: appName,
		render: function (model) {
			appView = templateRenderer.render(appName, model);
		},
		close: function () {
			appView && appView.close();
		}
	};
}

module("bbext").service("app", ["$", "appName", "templateRenderer", bbextapp]);




// templateBinder
// A shim used to find date-template
function templateBinder($, viewRenderer) {
	this.$ = $;
	this.viewRenderer = viewRenderer;
}
	
templateBinder.prototype = {
	render: function (el, model) {
		var $ = this.$,
			viewRenderer = this.viewRenderer,
			children = [],
			listeners,
			rootView,
			childrenListener;

		el = $(el);
		rootView = el.data("view");
		
		el.find("[data-templatefrom]").each(function (i, templateEl) {
			var templateFor,
				closestTemplate,
				view;

			templateEl = $(templateEl);
			
			// restrict rendering to the first level of templates
			closestTemplate = templateEl.parent().closest("[data-templatefrom]");
			if (closestTemplate[0] !== el[0]) {
				return;
			}

			templateFor = templateEl.data("templatefrom");
			view = viewRenderer.render(templateFor, {
				model: model
			});

			templateEl.replaceWith(view.$el);
			children.push[view];
		});
		
		// child view cleanup
		// could make children first class so any parent can directly refererence this.children["myAppSubView"].
		// - however - could not reuse views with the same template (not even sure if either of these cases are needed.
		listeners = rootView._listeners || (rootView._listeners = {}); // Backbone
		childrenListener = listeners["children"];
		childrenListener && childrenListener.off();
		listeners["children"] = {
			off: function () {
				$.each(children, function (i, child) {
					child && child.close && child.close();
				});
			}
		};
	}
};

context.module("bbext").shim("templateBinder", ["$", "viewRenderer", templateBinder]);


// templateRenderer
// caches the template, uses the viewRenderer to create and render the view
// appends the view el to the templates parent
function templateRenderer(templateCache, viewRenderer, $) {

	return {
		render: function (name, model) {

			var templateEl = $("[data-templatefor='" + name + "']"),
				// collapse the matches in reverse
				childTemplates = $(templateEl.find("[data-templatefor]").get().reverse()),
				view;

			childTemplates.each(function (i, template) {
				var viewName;

				template = $(template);
				viewName = template.data("templatefor");
				
				templateCache.cacheTemplateFor(viewName, template);

				template.empty();
			});

			templateCache.cacheTemplateFor(name, templateEl);
			templateEl.removeAttr("data-templatefrom").attr("data-templatefor", name);

			view = viewRenderer.render(name, {
				model: model
			});

			templateEl.after(view.$el);
			return view;
		}
	};

}

context.module("bbext").service("templateRenderer", ["templateCache", "viewRenderer", "$", templateRenderer]);


// templateCache
// compiles caches and returns templates by view name
var templateCache = (function () {

	return function ($, _, globalCache) {

		globalCache.set("templates", {});

		// set the template parsing to {{value}} instead of <%= value %>
		_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


		return {
			cacheTemplateFor: function (name, templateEl) {
				var html, templateFn;
				
				templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
				html = $('<script/>').append(templateEl[0].outerHTML).html(),
				templateFn = _.template(String(html));

				setTemplate(name, templateFn);
				return templateFn;
			},

			getTemplateFor: function (name) {
				var templateFn = getTemplate(name),
					templateEl;

				if (!templateFn) {
					templateEl = $("[data-templatefor='" + name + "']");
					templateEl.removeAttr("data-templatefor").attr("data-templatefrom", name);
					if (templateEl.length === 0) {
						throw "Template for '" + name + "' not found";
					}
					templateFn = this.cacheTemplateFor(name, templateEl);
				}

				return templateFn;
			}
		};

		function setTemplate(name, template) {
			var templates = globalCache.get("templates");
			templates[name] = template;
			globalCache.set("templates", templates);
		}

		function getTemplate(name) {
			var templates = globalCache.get("templates");
			return templates[name];
		}
	};

}());

context.module("bbext").service("templateCache",
	["$", "_", "globalCache", templateCache]);


/*
note:
data-templatefor - a template that has been untouched
data-tempate - a template that has been cached but not yet used in a view
data-templatefrom - a template that has been used in a view
*/