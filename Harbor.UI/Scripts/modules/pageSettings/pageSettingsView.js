

function pageSettingsView(
	options,
	currentPageRepo,
	modelFactory,
	menuFactory,
	location,
	appurl,
	commandHandler
) {
	this.currentPageRepo = currentPageRepo;
	this.menuFactory = menuFactory;
	this.location = location;
	this.appurl = appurl;
	this.commandHandler = commandHandler;

	this.model = this.currentPageRepo.getCurrentPage();
	this.model.pagePreviewModel = modelFactory.create("pagePreviewModel", { page: this.model });
}

pageSettingsView.prototype = {
	initialize: function () {

		this.bindAll("goAfterDelete", "refreshPage");

		// save events
		this.listenTo(this.model, "change:title", this.changeTitle);
		this.listenTo(this.model, "change:published", this.saveModel);
		this.listenTo(this.model, "change:isARootPage", this.changeRootPage);
		this.listenTo(this.model.pagePreviewModel, "pagepreview:openfileselector", this.close);
		this.listenTo(this.model.template, "change", this.saveModel);
	},
	
	changeTitle: function () {
		this.saveModel();
	},
	
	saveModel: function () {
		this.currentPageRepo.saveCurrentPage();
	},

	changeRootPage: function () {
		this.commandHandler.execute(this.model, "updateRootPages", {
			isARootPage: this.model.attributes.isARootPage,
			name: this.model.attributes.title
		});
	},
	
	deletePage: function () {
		var answer = confirm("Are you sure you want to delete this page?");
		if (!answer) {
			return;
		}
		
		this.currentPageRepo.deleteCurrentPage().then(this.goAfterDelete);
	},
	
	resetLayout: function () {
		if (confirm("This will reset the layout and make this page no longer associated with its current layout.")) {
			this.commandHandler.execute(this.model, "resetPageLayout").then(this.refreshPage);
		}
	},

	goAfterDelete: function (response) {

		this.location.href = response;
	},

	refreshPage: function () {

		this.location.reload(true);
	},
	
	onClose: function () {
		this.menu && this.menu.close();
	}
};

pageSettings.view("pageSettingsView", [
	"options",
	"currentPageRepo",
	"modelFactory",
	"menuFactory",
	"location",
	"appurl",
	"commandHandler",
	pageSettingsView]);
