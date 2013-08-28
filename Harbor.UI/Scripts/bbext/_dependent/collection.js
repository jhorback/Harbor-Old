/*
 * service: bbext.View
 *     An extension of the Backbone.View with all of the view extensions.
 * 
 * construct: view
 *     Allows for the creation of a bbext.View which is injected.
 */
(function () {
	"use strict";


	function Collection(Backbone, prepareModelColExt) {
		var Collection = Backbone.Collection.extend({});
		prepareModelColExt.extend(Collection.prototype);
		return Collection;
	};


	function collectionConstruct(Backbone, Collection, mvcorConstruct) {

		return mvcorConstruct.create(Backbone.Collection, Collection);

	};


	// register

	bbext.service("bbext.Collection", [
		"Backbone", "bbext.prepareModelColExt",
		bbext.Collection = Collection]);

	bbext.construct("collection",
		["Backbone", "bbext.Collection", "bbext.mvcorConstruct",
		collectionConstruct]);

	// for generic collections, see factories.js
	bbext.collection("collection", {});
}());
