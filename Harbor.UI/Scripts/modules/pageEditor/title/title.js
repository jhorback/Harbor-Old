
// just sets up a listener for the displayTitle on page edit
pageEditor.title = {
	init: function () {
		
	},

	onRemove: function () {
	}
};

pageEditor.pageComponent("title", pageEditor.title);


pageEditor.titleView = {
	//initialize: function () {
	//	alert("intit title view");
	//},

	//onRender: function () {
	//	alert("onRender");
	//},

	onClose: function () {
		this.$("form").remove();
	}
};

pageEditor.titleModel = {
	defaults: {
		displayTitle: null,
		parentUrl: null,
		hasParentUrl: false,
		enableTitleBackground: false
	}
};

pageEditor.view("titleView", pageEditor.titleView);
pageEditor.model("titleModel", pageEditor.titleModel);
