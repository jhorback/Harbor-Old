

pageEditor.productLinkView = function (options, pageSelector) {

	this.pageSelector = pageSelector;
};


pageEditor.productLinkView.prototype = {
	initialize: function () {
		_.bindAll(this, "save", "selectPage");

		this.listenTo(this.model, "change:tileDisplay", this.save);
	},

	save: function () {
		this.options.saveCurrentPage();
	},

	openPageSelector: function () {
		this.pageSelector.render({
			filter: "products",
			select: this.selectPage,
			allowPageAdd: true,
			parentPageTypeKey: this.model.page.attributes.pageTypeKey,
			newPageTypeFilter: ["product"]
		}, this);
	},
	
	selectPage: function (page) {
		var pageID = page.get("id");
		this.model.set({
			pageID: pageID,
			title: page.get("title"),
			previewText: page.get("previewText"),
			previewImageID: page.get("previewImageID")
		});
		this.save();
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};



pageEditor.view("productlinkView", [
	"options",
	"pageSelector",
	pageEditor.productLinkView
]);



