/*
 * service: bbext.View
 *     An extension of the Backbone.View with all of the view extensions.
 *
 * construct: view
 *     Allows for the creation of a bbext.View which is injected.
 */
bbext.viewConstruct = function (backboneConstruct, mixins, shims) {
    "use strict";

    var View = Backbone.View.extend({}),
		viewMixins = [
			"commonBackboneObjectExt",
			"childViewExt",
			"closeViewExt",
			"renderViewExt",
			"errorDisplayViewExt"
		],
		viewShims = [
			"gaSendEventShim",
			"eventBinderShim",
			"modelBinderShim",
			"templateBinderShim"
		];

    mixins.map("defaultViewMixins", viewMixins);
    View.prototype = mixins.mixin(View.prototype, ["defaultViewMixins"]);

    return backboneConstruct.createFrom(View, function (name, construct) {
        shims.addToView(construct, viewShims);
    });

};


bbext.construct("view", [
	"backboneConstruct",
	"mixins",
	"shims",
	bbext.viewConstruct
]);


// for generic views, see factories.js
bbext.view("view", {});
