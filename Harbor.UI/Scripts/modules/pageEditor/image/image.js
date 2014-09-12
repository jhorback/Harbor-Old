

pageEditor.image = {
	onCreate: function () {
		this.view.openFileSelector();
	}
};


pageEditor.pageComponent("image", pageEditor.image);