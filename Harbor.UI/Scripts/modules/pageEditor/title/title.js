
// just sets up a listener for the title
pageEditor.title = {
	
};

pageEditor.pageComponent("title", pageEditor.title);


pageEditor.titleView = {};

pageEditor.titleModel = {
	defaults: {
		displayTitle: null
	}
};

pageEditor.view("titleView", pageEditor.titleView);
pageEditor.view("titleModel", pageEditor.titleModel);
