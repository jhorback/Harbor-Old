

function pageAdderView(options, modelFactory, currentUserRepo, pageTypeRepo, pageRepo, dialogFactory) {

	this.modelFactory = modelFactory;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageTypeRepo = pageTypeRepo;
	this.pageRepo = pageRepo;
	this.dialogFactory = dialogFactory;
}


pageAdderView.prototype = {
	initialize: function () {
		
		this.model = this.modelFactory.create("page", {
			author: this.currentUser.get("username"),
			pageTypeDescription: null
		});
		
		this.model.pageTypes = this.pageTypeRepo.getPageTypes();
		this.listenTo(this.model, "change:pageTypeKey", this.setPageTypeDescription);
		this.listenTo(this.model.pageTypes, "sync", this.setPageTypeDescription);
		this.setPageTypeDescription();
	},
	
	setPageTypeDescription: function () {
		var pageTypeKey = this.model.get("pageTypeKey"),
			pageType = this.model.pageTypes.find(function (type) {
				return type.get("key") === pageTypeKey;
			});
		
		// jch! - cannot dynamically add model properties - see how to add it to the modelbinder
		if (pageType) {
			this.model.set("pageTypeDescription", pageType.get("description"));
		}
	},

	submitForm: function (event) {
		event.preventDefault();
		this.saveModel();
	},
	
	cancel: function () {
		this.close();
	},

	onRender: function () {
		this.dialogFactory.create(this.$el, {
			title: "Add a page",
			modal: true,
			transition: "fade"
		});
	},

	saveModel: function () {
		var self = this;

		if (!this.isModelValid()) {
			return;
		}
		
		this.pageRepo.savePage(this.model, {
			clientError: function (response) {
				self.displayErrors(response.errors);
			},
			success: function () {
				var url = this.model.getUrl();
				window.location = url;
			}
		}, this);
	}
};


pageAdder.view("pageAdderView", [
	"options", "modelFactory", "currentUserRepo", "pageTypeRepo", "pageRepo", "dialogFactory",
	pageAdderView]);