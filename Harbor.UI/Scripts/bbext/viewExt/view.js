﻿/*
 * service: bbext.View
 *     An extension of the Backbone.View with all of the view extensions.
 * 
 * construct: view
 *     Allows for the creation of a bbext.View which is injected.
 */
(function () {
	"use strict";
	
	var bbext = context.module("bbext");

	bbext.service("bbext.View", [
		"Backbone", "bbext.closeViewExt", "bbext.renderViewExtension",
	function (Backbone, closeViewExt, renderViewExt) {

		var View = Backbone.View.extend({});
		closeViewExt.extend(View.prototype);
		renderViewExt.extend(View.prototype);

		return View;
	}]);


	bbext.construct("view",
		["Backbone", "bbext.View", "bbext.mvcorConstruct",
	function (Backbone, View, mvcorConstruct) {

		return mvcorConstruct.create(Backbone.View, View);

	}]);
}());
