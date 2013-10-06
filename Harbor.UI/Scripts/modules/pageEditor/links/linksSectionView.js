

pageEditor.linksSectionView = function (options, pageSelector, _, currentPageRepo) {

	this.pageSelector = pageSelector;
	this.bind = _.bind;
	this.currentPageRepo = currentPageRepo;
};

pageEditor.linksSectionView.prototype = {
	addLink: function (event) {
		this.pageSelector.render({
			select: this.bind(this.selectPage, this)
		});
	},

	removeSection: function (event) {
		this.model.collection.remove(this.model);
	},
	
	selectPage: function (page) {
		var currentPage = this.currentPageRepo.getCurrentPage();
		currentPage.addPageLinkRef(page);
		this.model.links.add(page);
	}
};


pageEditor.view("linksSectionView", [
	"options",
	"pageSelector",
	"_",
	"currentPageRepo",
	pageEditor.linksSectionView
]);