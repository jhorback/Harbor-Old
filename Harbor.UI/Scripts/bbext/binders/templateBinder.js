
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


// templateRenderer
// caches the template, uses the viewRenderer to create and render the view
// appends the view el to the templates parent
context.module("bbext").service("templateRenderer",
	["templateCache", "viewRenderer",
function (templateCache, viewRenderer) {

	return {
		render: function (name, templateEl, model) {
			
			// cache the template since we have it
			templateCache.cacheTemplateFor(name, templateEl);
			viewRenderer.render(name, {
				model: model
			});
			// append the element to the parent
			templateEl.parent().append(view.$el);
		}
	};
}]);


// templateCache
// compiles caches and returns templates by view name
context.module("bbext").service("templateCache",
	["$", "_",
function ($, _) {

	var templates = {};
	
	// set the template parsing to {{value}} instead of <%= value %>
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


	return {
		cacheTemplateFor: function (name, templateEl) {
			var html = $('<script/>').append(templateEl).html(),
			    strHtml = String(html).replace(/data-templatefor/i, "data-templatefrom"),
				templateFn = _.template(strHtml);
			
			templates[name] = templateFn;
			return templateFn;
		},
		
		getTemplateFor: function(name) {
			var templateFn = templates[name],
				templateEl;
			
			if (!templateFn) {
				templateEl = $("[data-templatefor='" + name + "']");
				if (templateEl.length === 0) {
					throw "Template for '" + name + "' not found";
				}
				templateFn = this.cacheTemplateFor(name, templateEl);
			}
			
			return templateFn;
		}
	};
}]);


// templateBinder
// A shim used to find date-templatefor
context.module("bbext").shim("templateBinder",
	["$", "templateRenderer",
function ($, templateRenderer) {

	this.$ = $;
	this.templateRenderer = templateRenderer;

}], {
	// looks for data-templatefor
	render: function (el, model) {
		var jsonModel = model.toJSON(),
			rootModelHasGet = model.get ? true : false,
			isElATemplate;

		debugger;
		el = this.$(el);
		isElATemplate = el.attr("data-templatefor") ? true : false;
		el.find("[data-templatefor]").each(function (i, templateEl) {
			var templateFor,
				bindTo,
				templateModel = null,
				closestTemplate;

			templateEl = this.$(templateEl);

			// restrict rendering to the first level of templates
			closestTemplate = templateEl.parent.closest("[data-template-for]");
			if ((isElATemplate === false && closestTemplate.length !== 0) || closestTemplate[0] !== el[0]) {
				return;
			}

			templateFor = templateEl.attr("data-templatefor");
			bindTo = templateEl.data("bind");

			if (bindTo) {
				// if data-bind attribute on template try model.get or pulling from json
				templateModel = rootModelHasGet ? model.get(bindTo) : jsonModel[bindTo];
			}

			this.templateRenderer.render(templateFor, templateEl, templateModel);
		});
	}
});