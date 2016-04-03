/*
 * templateBinder - shim [data-view]
 *     A shim used to find data-view and put
 *    instances of views in their place
 */
bbext.templateBinderShim = function (viewRenderer) {
	
	return {
		selector: "[data-view-from]",

		resolve: function (el, model, matches, sourceTemplate) {
		    var rootView;

			el = $(el);
			rootView = el.data("view");

			matches.each(function(i, templateEl) {
				var templateFor,
					closestTemplate,
					view;

				templateEl = $(templateEl);

				// restrict rendering to the first level of templates
				closestTemplate = templateEl.parent().closest("[data-view-from]");
				if (closestTemplate[0] !== el[0]) {
					return;
				}

				templateFor = templateEl.data("view-from");
				
				view = viewRenderer.render(templateFor, {
					rootModel: model && model.rootModel,
					model: model,
					el: templateEl.data("collection") ? templateEl.parent() : templateEl
				}, {
				    isParsedView: true,
				    sourceTemplate: sourceTemplate
				});
				view.rootModel = view.model && view.model.rootModel;

				// don't need to remove - templateEl.remove();

				if (rootView) {
					rootView.views.add(view);
				}
			});
		}
	};
};


bbext.shim("templateBinderShim", [
	"viewRenderer",
	bbext.templateBinderShim
]);