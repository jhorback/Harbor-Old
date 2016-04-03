/*
 *
 */
bbext.collectionConstruct = function (
    backboneConstruct,
    collectionConstructService
) {
    var Collection = collectionConstructService.getBackboneCollection();

    return backboneConstruct.createFrom(Collection);
};

bbext.construct("collection", [
	"backboneConstruct",
	"collectionConstructService",
	bbext.collectionConstruct
]);



bbext.collectionConstructService = function (mixins) {
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

    return {
        getBackboneCollection: function () {
            return Collection;
        }
    }
};

bbext.service("collectionConstructService", ["mixins",
    bbext.collectionConstructService
]);


// for generic collections, see factories.js
bbext.collection("collection", {});
