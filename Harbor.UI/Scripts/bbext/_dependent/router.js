/*
 */
(function () {
	"use strict";


	function routerConstruct(Backbone, mvcorConstruct, mixin) {

		var Router = mixin("router").mixin(Backbone.Router.extend({}));
		
		return mvcorConstruct.create(Router);
	}


	bbext.construct("router",
		["Backbone", "bbext.mvcorConstruct", "mixin",
		routerConstruct]);
	

	// for generic routers
	bbext.router("router", {});
}());

