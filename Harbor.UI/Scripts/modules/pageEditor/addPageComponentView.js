
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
	this.modelFactory = modelFactory;
	this.currentPageRepo = currentPageRepo;
	this.pageComponentRepo = pageComponentRepo;
	this.dialogFactory = dialogFactory;
	this.selectlistFactory = selectlistFactory;
	this.commandHandler = commandHandler;
};


pageEditor.addPageComponentView.prototype = {
	initialize: function () {
		this.model = this.modelFactory.create("addPageComponentViewModel");
		this.model.page = this.currentPageRepo.getCurrentPage();
		this.model.pageComponents = this.pageComponentRepo.createPageComponents();
		this.model.primaryComponents = this.pageComponentRepo.createPageComponents();
		this.model.otherComponents = this.pageComponentRepo.createPageComponents();
		this.listenTo(this.model.pageComponents, "sync", this.componentsSync);

		this.pageComponentRepo.fetchPageComponents(this.model.pageComponents, this.options.parentPageTypeKey);	
	},

	componentsSync: function () {
		var primary = this.model.pageComponents.where({isPrimaryToAdd: true}),
			other = this.model.pageComponents.where({isPrimaryToAdd: false});	
		this.model.primaryComponents.reset(primary);
		this.model.otherComponents.reset(other);
		if (other.length > 0) {
			this.model.set("hasOtherComponentTypes", true);
		}
	},
	
	onRender: function () {
		var model = this.model;
		
		this.dialog = this.dialogFactory.create(this.$el);
		
		this.selectlistFactory.create(this.$el.find(".selectlist"), {
			change: function (event, info) {
				model.set("pageComponentKey", info.value());
			}
		});
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