

function pageLoaderView(options, modelFactory, pageEditor, pageSettings) {
	this.modelFactory = modelFactory;
	this.pageEditor = pageEditor;
	this.pageSettings = pageSettings;
}


pageLoaderView.prototype = {
	initialize: function () {
		this.bindAll("onSettingsClose");
		this.model = this.modelFactory.create("pageLoaderModel");
	},

	showSettings: function (event) {
		this.model.set("settingsOpen", true);
		if (this.model.attributes.editingPage === false) {
			this.pageEditor.render();
		}
		this.settingsView = this.pageSettings.render();
		this.settingsView.on("close", this.onSettingsClose);
	},

	onSettingsClose: function () {
		this.settingsView && this.settingsView.off("close", this.onSettingsClose);
		this.model.set("settingsOpen", false);
		if (this.model.attributes.editingPage === false) {
			this.doneEditing();
		}
	},

	editPage: function (event) {
		this.model.set("editingPage", true);
		this.pageEditor.render();
	},

	doneEditing: function (event) {
		this.pageEditor.close();
		this.model.set("editingPage", false);
	}
};


pageLoader.view("pageLoaderView", [
	"options", "modelFactory", "pageEditor", "pageSettings",
	pageLoaderView]);