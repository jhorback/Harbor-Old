//
// templateRenderer
//     caches the template, uses the viewRenderer to create and render the view
//     appends the view el to the templates parent
//     The root render method - called on by app.render();
//
// options
//     - all options are passed to the view when creating it
//     - insertAfterTemplate: If true, the view will be inserted
//           into the DOM after the template element.
// NOTE:
//     if insertAfterTemplate is not true, the view will not be inserted into the dom (it will need to be done manually).
//
function templateRenderer(templateCache, viewRenderer, $, shims, deprecate, console) {

	return {
		render: function (name, options) {

			var templateEl = $("[data-templatefor='" + name + "']"),
				childTemplates,
				view;

			options = options || {};

			if (templateEl.length !== 0) {
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

				// templateCache.cacheTemplateFor(name, templateEl, true);
				templateCache.cacheTemplateFor(name, templateEl, { isRoot: true });
				templateEl.removeAttr("data-templatefrom").attr("data-templatefor", name);
			}

			view = viewRenderer.render(name, options);
			if (options.insertAfterTemplate === true) {
				console.log("templateRenderer: Inserting the root template after the template element.");
				templateEl.after(view.$el);
			} else {
				console.log("templateRenderer: The template is independent.");
			}
			
			templateEl.remove();
			return view;
		}
	};

}

context.module("bbext").service("templateRenderer", [
	"templateCache", "viewRenderer", "$", "shims", "deprecate", "console",
	bbext.templateRenderer = templateRenderer]);