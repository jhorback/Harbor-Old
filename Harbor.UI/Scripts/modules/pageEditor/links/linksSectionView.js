

pageEditor.linksSectionView = function (options, templateRenderer) {

	this.templateRenderer = templateRenderer;
};


pageEditor.linksSectionView.prototype = {
	initialize: function () {
		this.bindAll("updateOrder");
	},
	
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
		this.templateRenderer.render("linksAddLinkView", {
			model: this.model
		});
	},
	
	removeSection: function (event) {
		if (confirm("Are you sure you want to remove this section of links?")) {
			this.model.collection.remove(this.model);
		}
	}
};


pageEditor.view("linksSectionView", [
	"options",
	"templateRenderer",
	pageEditor.linksSectionView
]);