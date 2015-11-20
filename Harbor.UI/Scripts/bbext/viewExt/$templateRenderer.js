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
//     Also, a rootModel property is added to the options (if a model is defined)
//          and after view rendering for child views to reference.
//
bbext.templateRenderer = function (
	unparsedTemplateFinder,
	templateCache,
	viewRenderer,
	viewFactory,
	context,
	console) {

    return {
        render: function (name, options) {

            var templateEl = unparsedTemplateFinder.find(name),
				childTemplates,
				view,
				templateShims = context.get(name, true).prototype.shims || [];

            options = options || {};

            // parse the view for child templates
            if (templateEl.length !== 0 && !templateEl.data("view-parsed")) {
                tagGenericViewTemplates(templateEl);

                // collapse the matches in reverse
                childTemplates = $(templateEl.find("[data-templatefor]").get().reverse());

                childTemplates.each(function (i, template) {
                    var viewName;

                    template = $(template);
                    viewName = template.data("templatefor");

                    templateCache.cacheTemplateFor(viewName, template, {
                        shims: templateShims
                    });

                    template.empty();
                });

                // templateCache.cacheTemplateFor(name, templateEl, true);
                templateCache.cacheTemplateFor(name, templateEl, {
                    isRoot: true,
                    shims: templateShims
                });
                templateEl.removeAttr("data-templatefrom").attr("data-templatefor", name);
            }

            options.rootModel = options.model;
            view = viewRenderer.render(name, options);
            if (view.model) {
                view.rootModel = view.model;
                view.model.rootModel = view.rootModel;
            }
            if (options.insertAfterTemplate === true) {
                console.log("templateRenderer: Inserting the root template after the template element.");
                templateEl.after(view.$el);
            } else {
                console.log("templateRenderer: The template is independent.");
            }

            templateEl.attr("data-view-parsed", true);
            templateEl.remove(); // if the template is in the dom, remove it
            // (note: this also removes it from a template, don't really need/want this? or do i?)
            return view;
        }
    };


    function tagGenericViewTemplates(el) {
        var collections = el.find("[data-collection]:not([data-templatefor])"),
			models = el.find("[data-model]:not([data-templatefor])");

        collections.add(models).each(function (i, templateEl) {
            var genericViewName = viewFactory.nextGenericName(),
				data;
            templateEl = $(templateEl);
            data = templateEl.data();
            templateEl.attr("data-templatefor", genericViewName);
            console.log("Found generic view for", data.model ? "model: " + data.model : "collection: " + data.collection);
        });
    }
}

bbext.service("templateRenderer", [
	"unparsedTemplateFinder",
	"templateCache",
	"viewRenderer",
	"viewFactory",
	"context",
	"console",
	bbext.templateRenderer
]);