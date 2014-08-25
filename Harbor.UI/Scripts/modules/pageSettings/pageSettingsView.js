

function pageSettingsView(options, currentPageRepo, modelFactory, menuFactory, location, appurl, commandHandler) {

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
		this.listenTo(this.model.template, "change", this.saveModel);
	},
	
	onRender: function () {
		this.menu = this.menuFactory.create(this.$el, {
			transition: "none",
			container: this.options.container
		});
	},
	
	changeTitle: function () {
		// jch* really want the current title component to be listening at this point
		// for now this hack is ok
		this.saveModel();
		$("[data-type=title] h1").html(this.model.layout.get("title"));
	},
	
	saveModel: function () {
		this.currentPageRepo.saveCurrentPage();
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
	"options", "currentPageRepo", "modelFactory", "menuFactory", "location", "appurl", "commandHandler",
	pageSettingsView]);
