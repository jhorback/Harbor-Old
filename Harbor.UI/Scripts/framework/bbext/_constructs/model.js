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
bbext.modelConstruct = function (backboneConstruct, mixins) {
    "use strict";

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

    return backboneConstruct.createFrom(Model, function (name, construct) {
        mixins.mixin(construct.prototype); // handle .mixins placed on the prototype
    });
};

bbext.construct("model", [
	"backboneConstruct",
	"mixins",
	bbext.modelConstruct
]);


// for generic models, see factories.js
bbext.model("model", {});

