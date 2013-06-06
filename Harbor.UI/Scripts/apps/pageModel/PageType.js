
pageModel.PageType = Backbone.Model.extend({
	urlRoot: Session.url("api/pagetypes"),
	defaults: {
		key: null,
		name: null,
		description: null
	}
});


pageModel.PageTypes = Backbone.Collection.extend({
	url: Session.url("api/pagetypes"),
	model: pageModel.PageType
});
