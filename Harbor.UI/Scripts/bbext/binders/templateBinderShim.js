/*
 * templateBinder - shim [data-templatefor]
 *     A shim used to find date-template and put
 *    instances of views in their place
 */
function templateBinderShim($, viewRenderer) {
	this.$ = $;
	this.viewRenderer = viewRenderer;
}
	
templateBinderShim.prototype = {
	selector: "[data-templatefrom]",
	render: function (el, model, matches) {
		var $ = this.$,
			viewRenderer = this.viewRenderer,
			listeners,
			rootView,
			childrenListener;

		el = $(el);
		rootView = el.data("view");
		
		matches.each(function (i, templateEl) {
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

			// el will have a parent if other code has moved it
			// e.g. collectionRenderer
			if (view.$el.parent().length === 0) {
				templateEl.replaceWith(view.$el);
			} else {
				templateEl.parent().replaceWith(view.$el);
			}
			templateEl.remove();
			
			rootView.views.add(view);
		});
	}
};


context.module("bbext").shim("templateBinderShim", ["$", "viewRenderer", bbext.templateBinderShim = templateBinderShim]);