/*
 */
(function () {
	"use strict";


	function routerConstruct(Backbone, mvcorConstruct, mixin) {

		var Router = Backbone.Router.extend({});
		Router = mixin("router").mixin(Router);
		
		return mvcorConstruct.create(Router);
	}


	bbext.construct("router",
		["Backbone", "bbext.mvcorConstruct", "mixin",
		routerConstruct]);
	

	// for generic routers
	bbext.router("router", {});
}());

