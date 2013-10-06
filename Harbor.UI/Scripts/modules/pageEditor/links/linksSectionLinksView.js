
pageEditor.linksSectionLinksView = {
	removeLink: function (event) {
		event.preventDefault;
		this.model.collection.remove(this.model);
	},
};

pageEditor.view("linksSectionLinksView", pageEditor.linksSectionLinksView);