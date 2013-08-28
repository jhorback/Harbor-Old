﻿

// templateRenderer
// caches the template, uses the viewRenderer to create and render the view
// appends the view el to the templates parent
// The root render method - called on by app.render();
function templateRenderer(templateCache, viewRenderer, $, shims) {

	return {
		render: function (name, model) {

			var templateEl = $("[data-templatefor='" + name + "']"),
				childTemplates,
				view;
			
			// allow shims to parse the raw template first
			shims.parse(templateEl);

			// collapse the matches in reverse
			childTemplates = $(templateEl.find("[data-templatefor]").get().reverse());
			

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

context.module("bbext").service("templateRenderer", [
	"templateCache", "viewRenderer", "$", "shims",
	bbext.templateRenderer = templateRenderer]);