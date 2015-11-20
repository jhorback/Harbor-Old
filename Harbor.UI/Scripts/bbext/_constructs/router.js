/*
 */
bbext.routerConstruct = function (backboneConstruct, mixins) {
    "use strict";

    var Router = Backbone.Router.extend({});

    mixins.map("defaultRouterMixins", [
		"commonBackboneObjectExt",
		"previousRouterExt",
		"startRouterExt",
		"managedRouterExt"
    ]);

    Router.prototype = mixins.mixin(Router.prototype, ["defaultRouterMixins"]);

    return backboneConstruct.createFrom(Router);
};


bbext.construct("router", [
	"backboneConstruct",
	"mixins",
	bbext.routerConstruct
]);


// for generic routers
bbext.router("router", {});
