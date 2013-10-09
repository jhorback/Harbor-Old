﻿
pageEditor.linksSectionModel = function (attrs, options, collectionFactory) {
	var links = attrs.links || [];
	
	this.links = collectionFactory.createGeneric(links, {
		model: "linkSectionLinkModel"
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


pageEditor.linkSectionLinkModel = function (attrs, options, location) {
	this.location = location;
};


pageEditor.linkSectionLinkModel.prototype = {
	defaults: {
		pageID: null,
		text: null,
		itemClassName: null
	},
	"[itemClassName]": {
		get: function (value) {
			var url = "/" + this.get("pageID") + "/" + this.get("text");
			return decodeURI(this.location.pathname.toLowerCase()).indexOf(url.toLowerCase()) > -1 ?
				"selected" : null;
		}
	}
};

pageEditor.model("linkSectionLinkModel", [
	"attrs",
	"options",
	"location",
	pageEditor.linkSectionLinkModel
]);


pageEditor.model("linksSectionModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageEditor.linksSectionModel
]);