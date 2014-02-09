
pageEditor.component("changeLayout");


// options: uicid - the uicid of the content component to update
pageEditor.changeLayoutView = function (
	options,
	currentPageRepo,
	modelFactory,
	dialogFactory
) {
	var currentPage;
	
	this.currentPageRepo = currentPageRepo;
	this.dialogFactory = dialogFactory;
	this.model = modelFactory.create("changeLayoutViewModel");
	
	currentPage = this.currentPageRepo.getCurrentPage();
	this.componentModel = currentPage.template.content.get(options.uicid);
	this.template = currentPage.template;
	this.model.setClassNames(this.componentModel.get("classNames"));
};


pageEditor.changeLayoutView.prototype = {
	
	submitForm: function (event) {
		event.preventDefault();
		this.save();
	},

	onRender: function () {
		this.dialog = this.dialogFactory.create(this.$el);
	},

	save: function () {
		var classNamesArray = this.model.getClassNames();
		var classNames = classNamesArray.join(" ");
		
		this.componentModel.set("classNames", classNamesArray);
		this.template.set("defaultContentClassName", classNames);
		this.currentPageRepo.saveCurrentPage();
		$("#" + this.componentModel.get("id")).removeClass().addClass(classNames + " uic");
		this.close();
	},

	onClose: function () {
		this.dialog && this.dialog.close();
	}
};


pageEditor.view("changeLayoutView", [
	"options",
	"currentPageRepo",
	"modelFactory",
	"dialogFactory",
	pageEditor.changeLayoutView
]);