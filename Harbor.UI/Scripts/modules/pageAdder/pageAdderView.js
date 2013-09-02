

function pageAdderView(options, modelFactory, currentUserRepo, pageTypeRepo, pageRepo) {

	this.modelFactory = modelFactory;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageTypeRepo = pageTypeRepo;
	this.pageRepo = pageRepo;
}


pageAdderView.prototype = {
	initialize: function () {
		
		this.model = this.modelFactory.create("page", {
			 author: this.currentUser.get("username")
		});
		
		this.model.pageTypes = this.pageTypeRepo.getPageTypes();
	},

	submitForm: function (event) {
		event.preventDefault();
		this.saveModel();
	},
	
	cancel: function () {
		this.close();
	},

	onRender: function () {
		var view, model;
		return;
		view = new Dialog(this.$el, {
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
	"options", "modelFactory", "currentUserRepo", "pageTypeRepo", "pageRepo",
	pageAdderView]);