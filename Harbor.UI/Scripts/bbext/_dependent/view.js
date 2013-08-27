/*
 * service: bbext.View
 *     An extension of the Backbone.View with all of the view extensions.
 * 
 * construct: view
 *     Allows for the creation of a bbext.View which is injected.
 */
(function () {

	bbext.View = function (
		Backbone,
		closeViewExt,
		renderViewExt,
		errorDisplayViewExt,
		viewMixins) {

		var View = Backbone.View.extend({});
		viewMixins.mixin(View.prototype);
		
		closeViewExt.extend(View.prototype);
		renderViewExt.extend(View.prototype);
		errorDisplayViewExt.extend(View.prototype);

		return View;
	};

	bbext.service("bbext.View", [
		"Backbone",
		"bbext.closeViewExt",
		"bbext.renderViewExt",
		"bbext.errorDisplayViewExt",
		"viewMixins",
		bbext.View]);


	bbext.viewConstruct = function (Backbone, View, mvcorConstruct, viewMixins) {
		
		return mvcorConstruct.create(Backbone.View, View, {
			beforeInit: function () {
				viewMixins.beforeInit(this, arguments);
			},
			afterInit: function () {
				viewMixins.afterInit(this, arguments);
			}
		});

	};

	bbext.construct("view", ["Backbone", "bbext.View", "bbext.mvcorConstruct", "viewMixins", bbext.viewConstruct]);
	
	bbext.view("view", {});
}());



