﻿

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