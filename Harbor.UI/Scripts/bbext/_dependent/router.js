/*
 */
(function () {
	"use strict";


	function routerConstruct(Backbone, mvcorConstruct) {
		
		return mvcorConstruct.create(Backbone.Router.extend({}));
	}


	bbext.construct("router",
		["Backbone", "bbext.mvcorConstruct",
		routerConstruct]);
	

	// for generic routers
	bbext.router("router", {});
}());

