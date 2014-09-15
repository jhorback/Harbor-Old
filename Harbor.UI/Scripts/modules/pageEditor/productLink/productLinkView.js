﻿

pageEditor.productLinkView = function (options, pageSelector, payPalButtonRenderer) {

	this.pageSelector = pageSelector;
	this.payPalButtonRenderer = payPalButtonRenderer;
};


pageEditor.productLinkView.prototype = {
	initialize: function () {
		_.bindAll(this, "save", "selectPage");

		this.listenTo(this.model, "change:tileDisplay", this.save);
	},
	
	onRender: function () {
		var previewEl;

		previewEl = this.$("[data-rel=buttonPreview]");
		this.payPalButtonRenderer.render(previewEl, this.model.firstButton, "XXX", true);
	},

	save: function () {
		this.options.saveCurrentPage();
	},

	openPageSelector: function () {
		this.pageSelector.render({
			filter: "products",
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



pageEditor.view("productlinkView", [
	"options",
	"pageSelector",
	"payPalButtonRenderer",
	pageEditor.productLinkView
]);



