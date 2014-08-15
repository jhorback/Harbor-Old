

pageEditor.linksSectionView = function (options, pageSelector) {

	this.pageSelector = pageSelector;
	this.bindAll("updateOrder", "selectPage");
};

pageEditor.linksSectionView.prototype = {
	
	onRender: function () {
		this.$el.sortable({
			handle: ".icon-reorder",
			items: "[data-collection=links]",
			revert: false,
			containment: this.$el.find("ul"),
			tolerance: "pointer",
			update: this.updateOrder
		});
	},
	
	updateOrder: function () {
		this.model.links.sort();
	},
	
	addLink: function (event) {
		// jch! - here
		// call the linksAddLinkView - 
		// that view can handle calling the commands (through the repo or what?)
		this.pageSelector.render({
			select: this.selectPage
		});
	},
	
	removeSection: function (event) {
		if (confirm("Are you sure you want to remove this section of links?")) {
			this.model.collection.remove(this.model);
		}
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
	pageEditor.linksSectionView
]);