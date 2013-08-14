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

	bbext.construct("collection",
		["Backbone", "bbext.mvcorConstruct",
	function (Backbone, mvcorConstruct) {

		return mvcorConstruct.create(Backbone.Collection, Backbone.Collection);

	}]);
}());
