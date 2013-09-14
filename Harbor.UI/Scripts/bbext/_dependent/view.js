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
		renderViewExt,
		errorDisplayViewExt,
		mixin) {

		var View = mixin("view").mixin(Backbone.View.extend({}));
		
		renderViewExt.extend(View.prototype);
		errorDisplayViewExt.extend(View.prototype);

		return View;
	};

	bbext.service("bbext.View", [
		"Backbone",
		"bbext.renderViewExt",
		"bbext.errorDisplayViewExt",
		"mixin",
		bbext.View]);


	bbext.viewConstruct = function (View, mvcorConstruct) {
		
		return mvcorConstruct.create(View);

	};

	bbext.construct("view", ["bbext.View", "bbext.mvcorConstruct", bbext.viewConstruct]);
	

	// for generic views, see factories.js
	bbext.view("view", {});
}());



