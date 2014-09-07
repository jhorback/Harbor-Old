
pageEditor.component("addPageComponent");


pageEditor.addPageComponentView = function (
	options,
	modelFactory,
	currentPageRepo,
	pageComponentRepo,
	dialogFactory,
	selectlistFactory,
	commandHandler
) {

	this.model = modelFactory.create("addPageComponentViewModel", {
		pageComponentKey: "image" // jch! - how to select the default here!
	});

	this.model.page = currentPageRepo.getCurrentPage();
	this.model.pageComponents = pageComponentRepo.getPageComponents();

	this.currentPageRepo = currentPageRepo;
	this.dialogFactory = dialogFactory;
	this.selectlistFactory = selectlistFactory;
	this.commandHandler = commandHandler;
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
		
		this.$el.find(":radio").eq(0).click();
	},
	
	formSubmit: function (event) {
		event.preventDefault();
		this.save();
	},

	save: function () {
		this.commandHandler.execute(this.model.page, "addTemplateContent", {
			key: this.model.get("pageComponentKey")
		});
		this.dialog.close();
	}
};

pageEditor.view("addPageComponentView", [
	"options",
	"modelFactory",
	"currentPageRepo",
	"pageComponentRepo",
	"dialogFactory",
	"selectlistFactory",
	"commandHandler",
	pageEditor.addPageComponentView
]);