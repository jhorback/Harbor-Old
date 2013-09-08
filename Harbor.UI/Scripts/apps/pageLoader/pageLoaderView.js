

function pageLoaderView(options, modelFactory, pageEditor, pageSettings) {
	this.modelFactory = modelFactory;
	this.pageEditor = pageEditor;
	this.pageSettings = pageSettings;
}


pageLoaderView.prototype = {
	initialize: function () {
		this.model = this.modelFactory.create("pageLoaderModel");
	},

	showSettings: function (event) {
		this.pageSettings.render();
	},

	editPage: function (event) {
		this.model.set("mode", "edit");
		this.pageEditor.render();
	},

	doneEditing: function (event) {
		this.model.set("mode", "view");
		this.pageEditor.close();
	}
};


pageLoader.view("pageLoaderView", [
	"options", "modelFactory", "pageEditor", "pageSettings",
	pageLoaderView]);