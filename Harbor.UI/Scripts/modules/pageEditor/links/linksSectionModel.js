
pageEditor.linksSectionModel = function (attrs, options, collectionFactory) {
	var links = attrs.links || [];
	
	this.links = collectionFactory.createGeneric(links, {
		model: "linkSectionLinkModel",
		comparator: function (model) {
			var node = $("#" + model.cid);
			var index = node.index();
			return index;
		}
	});
	
	this.links.on("all", function () {
		this.trigger("change:links");
	}, this);
};

pageEditor.linksSectionModel.prototype = {
	defaults: {
		title: null,
		hasTitle: false,
		links: []
	},
	
	"[links]": {
		get: function () {
			var links = this.links.toJSON();
			return links;
		}
	},

	"[hasTitle]": {
		get: function () {
			return this.get("title") ? true : false;
		}
	}
};


pageEditor.model("linksSectionModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageEditor.linksSectionModel
]);