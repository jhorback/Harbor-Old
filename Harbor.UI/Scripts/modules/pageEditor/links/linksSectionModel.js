
pageEditor.linksSectionModel = function (attrs, options, currentPageRepo, collectionFactory) {
	var i = 0,
		page = currentPageRepo.getCurrentPage(),
		links = attrs.links || [];
	
	this.links = collectionFactory.createGeneric([], {
		model: "page"
	});
	
	for (i = 0; i < links.length; i++) {
		this.links.add(page.getPageLink(links[i]));
	}
};

pageEditor.linksSectionModel.prototype = {
	defaults: {
		title: null,
		hasTitle: false,
		links: []
	},
	
	"[links]": {
		get: function () {
			return this.links.map(function (link) {
				return link.get("id");
			});
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
	"currentPageRepo",
	"collectionFactory",
	pageEditor.linksSectionModel
]);