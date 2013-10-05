


pageEditor.linksSectionView = {
	addLink: function (event) {
		alert("need to add a link");
	},

	removeSection: function (event) {
		this.model.collection.remove(this.model);
	}
};


pageEditor.view("linksSectionView", pageEditor.linksSectionView);