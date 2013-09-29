﻿

pageEditor.pageLinkView = function (options, currentPageRepo, pageSelector) {

	this.currentPageRepo = currentPageRepo;
	this.pageSelector = pageSelector;
};


pageEditor.pageLinkView.prototype = {
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
	}
};



pageEditor.view("pageLinkView", [
	"options",
	"currentPageRepo",
	"pageSelector",
	pageEditor.pageLinkView
]);