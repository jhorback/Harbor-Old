

pageEditor.linksSectionView = function (options, pageSelector, _) {

	this.pageSelector = pageSelector;
	this.bind = _.bind;
};

pageEditor.linksSectionView.prototype = {
	//initialize: function () {
	//	//var $ = this.$;
	//	this.model.collection.comparator = function (model) {
	//		var node = $("#" + model.cid);
	//		var index = node.index();
	//		return index;
	//	};
	//},
	
	onRender: function () {
		this.$el.sortable({
			handle: ".icon-reorder",
			items: "[data-collection=links]",
			revert: false,
			containment: this.$el.find("ul"),
			tolerance: "pointer",
			update: this.bind(this.updateOrder, this)
		});
	},
	
	updateOrder: function () {
		this.model.links.sort();
	},
	
	addLink: function (event) {
		this.pageSelector.render({
			select: this.bind(this.selectPage, this)
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
	"_",
	"currentPageRepo",
	pageEditor.linksSectionView
]);