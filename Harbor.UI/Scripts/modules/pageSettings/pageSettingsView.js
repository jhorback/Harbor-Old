﻿

function pageSettingsView(options, currentPageRepo, modelFactory, menuFactory, location, appurl) {

	this.currentPageRepo = currentPageRepo;
	this.menuFactory = menuFactory;
	this.location = location;
	this.appurl = appurl;

	this.bindAll("goHome");
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
			transition: "none",
			container: this.options.container
		});
	},
	
	templateChange: function () {
		var classNames = this.model.getLayoutClassNames(),
			el = $("#page");
		
		el.removeClass().addClass("page").addClass(classNames);
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
		
		this.currentPageRepo.deleteCurrentPage().then(this.goHome);
	},
	
	goHome: function () {
		this.location = this.appurl.get();
	},
	
	onClose: function () {
		this.menu && this.menu.close();
	}
};

pageSettings.view("pageSettingsView", [
	"options", "currentPageRepo", "modelFactory", "menuFactory", "location", "appurl",
	pageSettingsView]);
