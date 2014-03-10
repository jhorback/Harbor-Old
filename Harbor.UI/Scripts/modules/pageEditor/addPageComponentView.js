﻿
pageEditor.component("addPageComponent");


pageEditor.addPageComponentView = function (
	options,
	modelFactory,
	currentPageRepo,
	pageComponentRepo,
	dialogFactory,
	componentManager,
	selectlistFactory
) {

	this.model = modelFactory.create("addPageComponentViewModel", {		
		componentType: options.type, // "header", "content", "aside"
		pageComponentKey: "image" // jch! testing
	});

	this.model.page = currentPageRepo.getCurrentPage();
	this.model.pageComponents = pageComponentRepo.getPageComponents();
	this.model.pageComponents.setFilter(function (model) {
		// console.log(model.get("type"), options.type, model.get("type") === options.type);
		return model.get("type") === options.type;
	});

	this.currentPageRepo = currentPageRepo;
	this.dialogFactory = dialogFactory;
	this.componentManager = componentManager;
	this.selectlistFactory = selectlistFactory;
};


pageEditor.addPageComponentView.prototype = {
	
	onRender: function () {
		var model = this.model;
		
		this.dialog = this.dialogFactory.create(this.$el);
		
		this.selectlistFactory.create(this.$el.find(".selectlist"), {
			change: function (event, info) {
				model.set("pageComponentKey", info.value());
			}
		});
		
		debugger;
		this.$el.find(":radio").eq(0).click();
	},
	
	formSubmit: function (event) {
		event.preventDefault();
		this.save();
	},

	save: function () {
		var template = this.model.page.template,
			component = template.addContent(this.options.type, this.model.get("pageComponentKey"));
		
		this.currentPageRepo.saveCurrentPage().then(_.bind(function () {
			this.componentManager.create(component);
			this.dialog.close();
		}, this));
		
	}
};

pageEditor.view("addPageComponentView", [
	"options",
	"modelFactory",
	"currentPageRepo",
	"pageComponentRepo",
	"dialogFactory",
	"componentManager",
	"selectlistFactory",
	pageEditor.addPageComponentView
]);