

function pageSettingsView(options, currentPageRepo, modelFactory, menuFactory) {

	this.currentPageRepo = currentPageRepo;
	this.menuFactory = menuFactory;
	
	this.model = this.currentPageRepo.getCurrentPage();
	this.model.pagePreviewModel = modelFactory.create("pagePreviewModel", { page: this.model });
}

pageSettingsView.prototype = {
	initialize: function () {
		this.listenTo(this.model.template, "change", this.templateChange);

		// save events
		this.listenTo(this.model, "change:title", this.changeTitle);
		this.listenTo(this.model, "change:published", this.saveModel);
		this.listenTo(this.model.template, "change", this.saveModel);
	},
	
	onRender: function () {
		this.menu = this.menuFactory.create(this.$el, {
			transition: "none"
		});
		this.$el.on("close", _.bind(this.close, this)); // jch* better way?
	},
	
	templateChange: function () {
		alert("template change");
		// PageSettings.events.trigger("layout:updated");
	},
	
	changeTitle: function () {
		// jch* really want the current title component to be listening at this point
		// for now this hack is ok
		this.saveModel();
		$("[data-type=title] h1").html(this.model.get("title"));
	},
	
	saveModel: function () {
		this.currentPageRepo.saveCurrentPage();
	},
	
	deletePage: function () {
		var answer = confirm("Are you sure you want to delete this page?");
		if (!answer) {
			return;
		}
		
		this.currentPageRepo.deleteCurrentPage().then(function () {
			history.back();
		});
	},
	
	onClose: function () {
		this.menu && this.menu.close();
	}
};

pageSettings.view("pageSettingsView", [
	"options", "currentPageRepo", "modelFactory", "menuFactory",
	pageSettingsView]);
