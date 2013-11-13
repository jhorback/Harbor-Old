

pageEditor.productLinkView = function (options, currentPageRepo, pageSelector, viewRenderer) {

	this.currentPageRepo = currentPageRepo;
	this.pageSelector = pageSelector;
	this.viewRenderer = viewRenderer;
};


pageEditor.productLinkView.prototype = {
	initialize: function () {
		_.bindAll(this, "save", "selectPage");

		this.listenTo(this.model, "change:tileDisplay", this.save);
	},
	
	save: function () {
		this.currentPageRepo.saveCurrentPage();
	},

	openPageSelector: function () {
		this.pageSelector.render({
			select: this.selectPage
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
		this.payPalButtonView && this.payPalButtonView.close();
	}
};



pageEditor.view("productLinkView", [
	"options",
	"currentPageRepo",
	"pageSelector",
	"viewRenderer",
	pageEditor.productLinkView
]);



