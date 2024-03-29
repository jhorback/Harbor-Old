﻿/*
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

	resolve: function(el, model, matches) {
		var $ = this.$,
			viewRenderer = this.viewRenderer,
			rootView,
			shim = this;

		el = $(el);
		rootView = el.data("view");

		matches.each(function(i, templateEl) {
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
				rootModel: model && model.rootModel,
				model: model,
				//el: templateEl.data("collection") ? templateEl.parent() : templateEl

				el: templateEl.data("collection") ? shim.getTemplateParent(templateEl) : templateEl
				// jch* if a collection use the parent so the modelbinder can work on select elements
			});
			view.rootModel = view.model && view.model.rootModel;

			templateEl.remove();

			if (rootView) {
				rootView.views.add(view);
			}
		});
	},

	getTemplateParent: function(templateEl) {
		return templateEl.siblings().length === 0 ?
			templateEl.parent() :
			$('<div/>').insertAfter(templateEl);
	}
};


context.module("bbext").shim("templateBinderShim", ["$", "viewRenderer", bbext.templateBinderShim = templateBinderShim]);