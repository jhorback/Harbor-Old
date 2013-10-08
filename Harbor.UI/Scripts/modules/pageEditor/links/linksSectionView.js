

pageEditor.linksSectionView = function (options, pageSelector, _) {

	this.pageSelector = pageSelector;
	this.bind = _.bind;
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
		this.model.links.add({
			pageID: page.get("id"),
			text: page.get("title")
		});
	}
};


pageEditor.view("linksSectionView", [
	"options",
	"pageSelector",
	"_",
	"currentPageRepo",
	pageEditor.linksSectionView
]);