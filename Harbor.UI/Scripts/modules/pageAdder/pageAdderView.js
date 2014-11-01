

pageAdder.pageAdderView = function (
	options,
	modelFactory,
	currentUserRepo,
	pageTypeRepo,
	commandHandler
) {
	this.modelFactory = modelFactory;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageTypeRepo = pageTypeRepo;
	this.commandHandler = commandHandler;
}


pageAdder.pageAdderView.prototype = {
	initialize: function () {
		
		this.model = this.modelFactory.create("pageAdderViewModel", {
			hasOtherPageTypes: false
		});
		
		this.model.pageTypes = this.pageTypeRepo.createPageTypes();
		this.model.primaryPageTypes = this.pageTypeRepo.createPageTypes();
		this.model.otherPageTypes = this.pageTypeRepo.createPageTypes();

		this.listenTo(this.model.pageTypes, "sync", this.pageTypesSync);
		this.on("component:detached", this.close);

		this.pageTypeRepo.fetchPageTypes(this.model.pageTypes, this.options.parentPageTypeKey);		
	},
	
	pageTypesSync: function () {
		var primary = this.model.pageTypes.where({isPrimaryToAdd: true}),
			other = this.model.pageTypes.where({isPrimaryToAdd: false});	
		this.model.primaryPageTypes.reset(primary);
		this.model.otherPageTypes.reset(other);
		if (other.length > 0) {
			this.model.set("hasOtherPageTypes", true);
		}
	},

	submitForm: function (event) {
		event.preventDefault();

		if (!this.isModelValid()) {
			return;
		}

		this.addPage();
	},

	addPage: function () {
		var self = this,
			page = this.model;

		if (this.options.createPage === false) {
			this.options.onAddPage && this.options.onAddPage(page);
			return;
		}

		// this.model
		// title, pageTypeKey
		//saveModel: function (model, attrs, options, handler, context) {
		this.commandHandler.saveModel(page, null, null, {
			clientError: function (response) {
				self.displayErrors(response.errors);
			},
			success: function () {
				var url;

				if (this.options.onAddPage) {
					this.options.onAddPage(page);
				} else {
					url = page.getUrl();
					window.location = url;
				}
			}
		}, this);
	},

	cancel: function () {
		this.close();
	},

	onClose: function () {
		this.dialog && this.dialog.close();
	}
};


pageAdder.view("pageAdderView", [
	"options",
	"modelFactory",
	"currentUserRepo",
	"pageTypeRepo",
	"commandHandler",
	pageAdder.pageAdderView
]);