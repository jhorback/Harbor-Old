/*
 * service: bbext.View
 *     An extension of the Backbone.View with all of the view extensions.
 * 
 * construct: view
 *     Allows for the creation of a bbext.View which is injected.
 */
(function () {

	bbext.View = function (Backbone, closeViewExt, renderViewExt) {

		var View = Backbone.View.extend({});
		closeViewExt.extend(View.prototype);
		renderViewExt.extend(View.prototype);

		return View;
	};

	bbext.service("bbext.View", ["Backbone", "bbext.closeViewExt", "bbext.renderViewExtension", bbext.View]);


	bbext.viewConstruct = function (Backbone, View, mvcorConstruct) {

		return mvcorConstruct.create(Backbone.View, View);

	};

	bbext.construct("view", ["Backbone", "bbext.View", "bbext.mvcorConstruct", bbext.viewConstruct]);
}());
