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

	function bbextModel(Backbone, _, backupModelExt, validationModelExt, mixin) {
		var Model = mixin("model").mixin(Backbone.Model.extend({}));

		Model.prototype._ = _;
		backupModelExt.extend(Model.prototype);
		validationModelExt.extend(Model.prototype);

		return Model;
	}

	bbext.service("bbext.Model", [
		"Backbone", "_", "bbext.backupModelExt", "bbext.validationModelExt", "mixin",
		bbextModel
	]);




	bbext.construct("model",
		["bbext.Model", "bbext.mvcorConstruct",
	function (Model, mvcorConstruct) {

		return mvcorConstruct.create(Model);
		
	}]);


	// for generic models, see factories.js
	bbext.model("model", { });
}());

