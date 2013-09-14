/*
 * service: bbext.View
 *     An extension of the Backbone.View with all of the view extensions.
 * 
 * construct: view
 *     Allows for the creation of a bbext.View which is injected.
 */
(function () {
	"use strict";


	function Collection(Backbone, mixin) {
		
		return mixin("collection").mixin(Backbone.Collection.extend({}));
	};


	function collectionConstruct(Collection, mvcorConstruct) {

		return mvcorConstruct.create(Collection);

	};


	// register

	bbext.service("bbext.Collection", [
		"Backbone", "mixin",
		bbext.Collection = Collection]);

	bbext.construct("collection",
		["bbext.Collection", "bbext.mvcorConstruct",
		collectionConstruct]);

	// for generic collections, see factories.js
	bbext.collection("collection", {});
}());
