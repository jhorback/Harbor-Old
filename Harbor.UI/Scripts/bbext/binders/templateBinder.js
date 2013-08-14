
// viewRenderer
// creates a view with the viewFactory
// allows for the model properties on the view to
//     be a callback or a promise or a callback that returns a promise
// waits for the promise then calls render on the view.
context.module("bbext").register("viewRenderer", 
	["viewFactory", "$",
function (viewFactory, $) {
	
	return {
		render: function (name, options) {
			// create the view
			var view = viewFactory.create(name, options);

			// wait for the view to load a model
			loadModel(view).then(function () {
				view.render(); // uses the templateFn from the templateCache
			});
		}
	};
	
	function loadModel(view) {
		var model = view.model;
		if (model) {
			if (model.then) {
				return model;
			}
			if ($.isFunction(model)) {
				model = model();
				if (model.then) {
					return model;
				}
			}
		}
		return $.Deferred().resolve(model).promise();
	}
}]);


// templateRenderer
// caches the template, uses the viewRenderer to create and render the view
// appends the view el to the templates parent
context.module("bbext").register("templateRenderer",
	["templateCache", "viewFactory",
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
context.module("bbext").register("templateCache",
	["$", "_",
function ($, _) {

	var templates = {};
	
	// set the template parsing to {{value}} instead of <%= value %>
	_.templateSettings = { interpolate: /\{\{(.+?)\}\}/g };


	return {
		cacheTemplateFor: function (name, templateEl) {
			var html = $('<script/>').append(templateEl).html(),
				templateFn = _.template(html);
			
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