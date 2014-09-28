
// just sets up a listener for the displayTitle on page edit
pageEditor.title = {
	init: function () {
		this.open();
	},

	onRemove: function () {
		this.close();
	}
};

pageEditor.pageComponent("title", pageEditor.title);


pageEditor.titleView = {};

pageEditor.titleModel = {
	defaults: {
		displayTitle: null
	}
};

pageEditor.view("titleView", pageEditor.titleView);
pageEditor.model("titleModel", pageEditor.titleModel);
