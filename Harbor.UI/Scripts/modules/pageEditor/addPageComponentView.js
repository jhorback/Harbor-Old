
pageEditor.component("addPageComponent");

// jch! - here
pageEditor.addPageComponentView = function (
	options,
	modelFactory,
	currentPageRepo,
	pageComponentRepo,
	dialogFactory
) {

	this.model = modelFactory.create("addPageComponentViewModel", {		
		componentType: options.type // "header", "content", "aside"
	});

	this.model.page = currentPageRepo.getCurrentPage();
	this.model.pageComponents = pageComponentRepo.getPageComponents();
	this.model.pageComponents.setFilter(function (model) {
		return model.get("type") === options.type;
	});
	this.dialogFactory = dialogFactory;
};


pageEditor.addPageComponentView.prototype = {
	
	onRender: function () {
		
		this.dialogFactory.create(this.$el);
	},
	
	formSubmit: function (event) {
		event.preventDefault();
		this.save();
	},

	save: function () {
		PageEditor.addComponent(this.model.page,
			this.model.viewModel.get("pageComponentKey"),
			this.model.viewModel.get("componentType"));
		this.close();
	}
};

pageEditor.view("addPageComponentView", [
	"options",
	"modelFactory",
	"currentPageRepo",
	"pageComponentRepo",
	"dialogFactory",
	pageEditor.addPageComponentView
]);