/*
 *
 * construct: model
 *
 * model: model
 *     Use for creating simple models
 */
bbext.modelConstruct = function (
    backboneConstruct,
    modelConstructService
) {
    "use strict";

    var Model = modelConstructService.getBackboneModel();
    return backboneConstruct.createFrom(Model);

    // jch* add test for setting mixins on the prototype
    //, function (name, construct) {
    //    mixins.mixin(construct.prototype); // handle .mixins placed on the prototype
    //});
};

bbext.construct("model", [
	"backboneConstruct",
	"modelConstructService",
	bbext.modelConstruct
]);



bbext.modelConstructService = function (mixins) {
    var Model = Backbone.Model.extend({});

    mixins.map("defaultModelMixins", [
        "commonBackboneObjectExt",
        "dfdModelExt",
        "getSetModelExt",
        "postCommandModelExt",
        "backupModelExt",
        "validationModelExt"
    ]);

    Model.prototype = mixins.mixin(Model.prototype, ["defaultModelMixins"]);

    return {
        getBackboneModel: function () {
            return Model;
        }
    }
};

bbext.service("modelConstructService", ["mixins",
    bbext.modelConstructService
]);


// for generic models, see factories.js
bbext.model("model", {});

