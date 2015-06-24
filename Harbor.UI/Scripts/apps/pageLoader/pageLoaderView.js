

function pageLoaderView(
	options,
	modelFactory,
	pageEditor,
	pageSettings,
	currentPageRepo,
	ajaxRequest
) {
	this.modelFactory = modelFactory;
	this.pageEditor = pageEditor;
	this.pageSettings = pageSettings;
	this.currentPageRepo = currentPageRepo;
	this.ajaxRequest = ajaxRequest;

	this.page = this.currentPageRepo.getCurrentPage();
}


pageLoaderView.prototype = {
	initialize: function () {
		this.bindAll("selectEditTab");

		this.model = this.modelFactory.create("pageLoaderModel");
	},

	onRender: function () {
		// enable going into edit mode when clicking a nocontent div
		$(".page-nocontent").on("click", this.selectEditTab);
	},

	onClose: function () {
		$(".page-nocontent").unbind("click", this.selectEditTab);
	},

	clickPageLoaderTab: function (event, tab) {
		this.selectTab(tab);
	},

	selectEditTab: function () {
		this.selectTab(this.model.tabs.get("edit"));
	},

	selectTab: function (tab) {
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
		this.pageSettings.close();
		this.loadPagePartialFromServer();
	},

	editTab: function () {
		this.pageSettings.close();
		this.pageEditor.render();
	},

	settingsTab: function () {
		this.pageEditor.close();
		this.pageSettings.render();
	},

	loadPagePartialFromServer: function() {
		// load page from server
		var url = this.page.get("link");
		var dfd = $.get(url, null, null, "html");
		this.ajaxRequest.handle(dfd, {
			success: function (response) {
				$("#frame-body").html(response);
			}
		});
	}
};


pageLoader.view("pageLoaderView", [
	"options",
	"modelFactory",
	"pageEditor",
	"pageSettings",
	"currentPageRepo",
	"ajaxRequest",
	pageLoaderView
]);