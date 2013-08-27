/*
 * service: bbext.Model
 *     An extension of the Backbone.Model with all of the model extensions.
 * 
 * construct: model
 *     Allows for the creation of a bbext.Model which is injected.
 *
 * model: model
 *     Use for creating simple models
 */
(function () {
	"use strict";
	
	var bbext = context.module("bbext");

	bbext.service("bbext.Model", [
		"Backbone", "bbext.backupModelExt", "bbext.getSetModelExt", "bbext.validationModelExt",
	function (Backbone, backupModelExt, getSetModelExt, validationModelExt) {

		var Model = Backbone.Model.extend({});
		backupModelExt.extend(Model.prototype);
		getSetModelExt.extend(Model.prototype);
		validationModelExt.extend(Model.prototype);
		return Model;
	}]);



	bbext.construct("model",
		["Backbone", "bbext.Model", "bbext.mvcorConstruct",
	function (Backbone, Model, mvcorConstruct) {

		return mvcorConstruct.create(Backbone.Model, Model);
		
	}]);


	// for generic models, see factories.js
	bbext.model("model", { });
}());

