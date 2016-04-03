/*
 * construct: view
 *    
 */
bbext.viewConstruct = function (
    backboneConstruct,
    viewConstructService,
    shims
 ) {
    "use strict";

    var View, viewShims;

    View = viewConstructService.getBackboneView();

	viewShims = [
		"gaSendEventShim",
		"eventBinderShim",
		"modelBinderShim",
		"templateBinderShim"
	];	

	return backboneConstruct.createFrom(View, function (name, construct) {
		shims.addToView(construct, viewShims);
	});

};


bbext.construct("view", [
	"backboneConstruct",
    "viewConstructService",
	"shims",
	bbext.viewConstruct
]);


bbext.viewConstructService = function (mixins) {
    var View = Backbone.View.extend({}),
           viewMixins = [
               "commonBackboneObjectExt",
               "childViewExt",
               "closeViewExt",
               "renderViewExt",
               "errorDisplayViewExt"
           ];

    mixins.map("defaultViewMixins", viewMixins);
    View.prototype = mixins.mixin(View.prototype, ["defaultViewMixins"]);

    return {
        getBackboneView: function () {
            return View;
        }
    }
};

bbext.service("viewConstructService", ["mixins",
    bbext.viewConstructService
]);


// for generic views, see factories.js
bbext.view("view", {});
