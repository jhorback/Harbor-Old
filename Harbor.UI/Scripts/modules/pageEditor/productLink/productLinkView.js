

pageEditor.productLinkView = function (options, pageSelector, payPalButtonRenderer) {

	this.pageSelector = pageSelector;
	this.payPalButtonRenderer = payPalButtonRenderer;
};


pageEditor.productLinkView.prototype = {
	initialize: function () {
		_.bindAll(this, "save", "selectPage");

		this.listenTo(this.model, "change:tileDisplay", this.save);
		this.listenTo(this.model, "change:productCount", this.onRender);
		this.listenTo(this.model.firstButton, "change", this.onRender);
	},
	
	onRender: function () {
		var previewEl,
			productCount = this.model.attributes.productCount;

		previewEl = this.$("[data-rel=buttonPreview]");
		if (productCount === 0) {
			previewEl.empty();
		} else if (productCount === 1) {
			this.payPalButtonRenderer.render(previewEl, this.model.firstButton, "XXX", true);
		} else {
			previewEl.empty().append('<span class="button loud">See purchase options</span>');	
		}
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
		this.payPalButtonView && this.payPalButtonView.close();
	}
};



pageEditor.view("productlinkView", [
	"options",
	"pageSelector",
	"payPalButtonRenderer",
	pageEditor.productLinkView
]);



