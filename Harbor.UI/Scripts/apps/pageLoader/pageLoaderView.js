

function pageLoaderView(options, modelFactory, pageEditor, pageSettings) {
	this.modelFactory = modelFactory;
	this.pageEditor = pageEditor;
	this.pageSettings = pageSettings;
}


pageLoaderView.prototype = {
	initialize: function () {
		this.model = this.modelFactory.create("pageLoaderModel");
	},

	onRender: function () {
		// enable going into edit mode when clicking a nocontent div
		$(".page-nocontent").on("click", this.onEditPage);
	},

	onClose: function () {
		$(".page-nocontent").unbind("click", this.onEditPage);
	},

	clickPageLoaderTab: function (event, tab) {
		
		if (tab.get("selected")) {
			return;
		}

		this.model.tabs.each(function (tab) {
			tab.set("selected", false);
		});
		
		tab.set("selected", true);
		this[tab.id + "Tab"]();
	},

	viewTab: function () {
		this.pageEditor.close();
		this.settingsView && this.settingsView.close();
	},

	editTab: function () {
		this.settingsView && this.settingsView.close();
		this.pageEditor.render();
	},

	settingsTab: function () {
		this.pageEditor.close();
		this.settingsView = this.pageSettings.render();
	}
};


pageLoader.view("pageLoaderView", [
	"options", "modelFactory", "pageEditor", "pageSettings",
	pageLoaderView]);