
var navLinks = module("navLinks");


var LinksModel = Application.Model.extend({
	defaults: {
		id: null,
		name: null,
		userName: null,
		sections: [] // title, links 
	}
});



var LinksCollection = Backbone.Collection.extend({
	model: LinksModel,
	url: Application.url("api/navlinks")
});