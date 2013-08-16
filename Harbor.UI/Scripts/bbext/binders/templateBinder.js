
// viewRenderer
// creates a view with the viewFactory
// allows for the model on the view to be a promise or contain promises
//     as properties that are resolved before rendering.
context.module("bbext").service("viewRenderer", 
	["viewFactory", "$",
function (viewFactory, $) {
	
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
}]);


/*

templateBinder is a shim that looks for data-templatefor
-> view.render();


app uses the templateRenderer which uses the viewRenderer which calls view.render()
[data-templatefor]





*/


module("bbext").service("app", [
	"$", "appName", "templateRenderer",
function ($, appName, templateRenderer) {

	return {
		name: appName,
		render: function (model) {
			templateRenderer.render(appName, model);
		}
	};

}]);



// templateBinder
// A shim used to find date-templatefor
context.module("bbext").shim("templateBinder",
	["$", "viewRenderer",
function ($, viewRenderer) {

	this.$ = $;
	this.viewRenderer = viewRenderer;

}], {
	render: function (el, model) {
		var $ = this.$;
		
		el = $(el);
		
		el.find("[data-template]").each(function (i, templateEl) {
			var templateFor,
			    closestTemplate,
			    view;

			templateEl = $(templateEl);

			// restrict rendering to the first level of templates
			closestTemplate = templateEl.parent().closest("[data-template]");
			if (closestTemplate[0] !== el[0]) {
				return;
			}

			templateFor = templateEl.data("template");
			templateEl.removeAttr("data-template").attr("data-templatefrom", name);

			view = this.viewRenderer.render(templateFor, {
				model: model
			});
			
			templateEl.replaceWith(view.$el);
		});
	}
});


// templateRenderer
// caches the template, uses the viewRenderer to create and render the view
// appends the view el to the templates parent
context.module("bbext").service("templateRenderer",
	["templateCache", "viewRenderer", "$",
function (templateCache, viewRenderer, $) {

	return {
		render: function (name, model) {

			var templateEl = $("[data-templatefor='" + name + "']"),
			    childTemplates = $(templateEl.find("[data-templatefor]").get().reverse()),
			    view;

			childTemplates.each(function (i, template) {
				var viewName;
				
				template = $(template);
				viewName = template.data("templatefor");

				template.removeAttr("data-templatefor").attr("data-template", viewName);
				templateCache.cacheTemplateFor(viewName, template);
				
				template.empty();
			});

			templateEl.removeAttr("data-templatefor").attr("data-template", name);
			templateCache.cacheTemplateFor(name, templateEl);
			view = viewRenderer.render(name, {
				model: model
			});
			
			templateEl.parent().append(view.$el);
		}
	};

}]);



// templateCache
// compiles caches and returns templates by view name
context.module("bbext").service("templateCache",
	["$", "_", "globalCache",
function ($, _, globalCache) {

	globalCache.set("templates", {});

	// set the template parsing to {{value}} instead of <%= value %>
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


	return {
		cacheTemplateFor: function (name, templateEl) {
			var html = $('<script/>').append(templateEl).html(),
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
}]);


/*
note:
data-templatefor - a template that has been untouched
data-tempate - a template that has been cached but not yet used in a view
data-templatefrom - a template that has been used in a view
*/