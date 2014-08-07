
pageModel.linksSectionModel = function (attrs, options, collectionFactory) {
	this.collectionFactory = collectionFactory;
};

pageModel.linksSectionModel.prototype = {
	defaults: {
		title: null,
		hasTitle: false,
		links: []
	},

	initialize: function (attrs, options) {
	
		this.links = this.collectionFactory.create("linkSectionLinkCollection", attrs.links || []);

		this.on("change:title", this.save);
		this.listenTo(this.links, "save add remove sort", this.save);
	},
	
	"[links]": {
		get: function () {
			var links = this.links && this.links.toJSON();
			return links;
		},

		set: function (value) {
			this.links && this.links.set(value); //, { silent: true});
			return value;
		}
	},

	"[hasTitle]": {
		get: function () {
			return this.get("title") ? true : false;
		}
	},

	save: function () {
		this.trigger("save");
	}
};


pageModel.model("linksSectionModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageModel.linksSectionModel
]);
