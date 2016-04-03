/*
 */
bbext.routerConstruct = function (
    backboneConstruct,
    routerConstructService
) {
	"use strict";

	var Router = routerConstructService.getBackboneRouter();
	return backboneConstruct.createFrom(Router);
};


bbext.construct("router", [
	"backboneConstruct",
	"routerConstructService",
	bbext.routerConstruct
]);


bbext.routerConstructService = function (mixins) {
    var Router = Backbone.Router.extend({});

    mixins.map("defaultRouterMixins", [
        "commonBackboneObjectExt",
        "previousRouterExt",
        "startRouterExt",
        "managedRouterExt"
    ]);

    Router.prototype = mixins.mixin(Router.prototype, ["defaultRouterMixins"]);

    return {
        getBackboneRouter: function () {
            return Router;
        }
    }
};

bbext.service("routerConstructService", ["mixins",
    bbext.routerConstructService
]);

// for generic routers
bbext.router("router", {});
