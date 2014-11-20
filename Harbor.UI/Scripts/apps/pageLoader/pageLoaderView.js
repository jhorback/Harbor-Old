

function pageLoaderView(options, modelFactory, pageEditor, pageSettings) {
	this.modelFactory = modelFactory;
	this.pageEditor = pageEditor;
	this.pageSettings = pageSettings;
}


pageLoaderView.prototype = {
	initialize: function () {
		this.bindAll("onEditPage", "onSettingsClose");
		this.model = this.modelFactory.create("pageLoaderModel");
	},

	onRender: function () {
		// enable going into edit mode when clicking a nocontent div
		$(".page-nocontent").on("click", this.onEditPage);
	},

	onClose: function () {
		$(".page-nocontent").unbind("click", this.onEditPage);
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

	onEditPage: function () {
		this.model.set("editingPage", true);
		this.pageEditor.render();
	},

	editPage: function (event) {
		this.onEditPage();
	},

	doneEditing: function (event) {
		this.pageEditor.close();
		this.model.set("editingPage", false);
	}
};


pageLoader.view("pageLoaderView", [
	"options", "modelFactory", "pageEditor", "pageSettings",
	pageLoaderView]);