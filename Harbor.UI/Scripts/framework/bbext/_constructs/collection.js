/*
 *
 */
bbext.collectionConstruct = function (backboneConstruct, mixins) {

    var Collection = Backbone.Collection.extend({});

    mixins.map("defaultCollectionMixins", [
		"commonBackboneObjectExt",
		"filterColExt",
		"groupColExt",
		"parseColExt",
		"postCommandColExt",
		"prepareModelColExt",
		"sortColExt"
    ]);

    Collection.prototype = mixins.mixin(Collection.prototype, ["defaultCollectionMixins"]);

    return backboneConstruct.createFrom(Collection);
};

bbext.construct("collection", [
	"backboneConstruct",
	"mixins",
	bbext.collectionConstruct
]);

// for generic collections, see factories.js
bbext.collection("collection", {});
