

function pageLoaderView(
	options,
	modelFactory,
	pageEditor,
	pageSettings,
	currentPageRepo,
	ajaxRequest,
	feedback
) {
	this.modelFactory = modelFactory;
	this.pageEditor = pageEditor;
	this.pageSettings = pageSettings;
	this.currentPageRepo = currentPageRepo;
	this.ajaxRequest = ajaxRequest;
	this.feedback = feedback;
}


pageLoaderView.prototype = {
	initialize: function () {
		var pageFeedback;

		this.bindAll("selectEditTab");

		this.page = this.currentPageRepo.getCurrentPage();
		this.model = this.modelFactory.create("pageLoaderModel");
		
		this.listenTo(this.page, "request", function () {
			pageFeedback = this.feedback.wait("Saving the page.");
		});

		this.listenTo(this.page, "sync error", function () {
			pageFeedback && pageFeedback.finished();
		});
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
	"feedback",
	pageLoaderView
]);