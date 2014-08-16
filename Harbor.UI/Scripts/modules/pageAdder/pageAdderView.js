

function pageAdderView(options, modelFactory, currentUserRepo, pageTypeRepo, pageRepo, dialogFactory) {

	this.modelFactory = modelFactory;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageTypeRepo = pageTypeRepo;
	this.pageRepo = pageRepo;
	this.dialogFactory = dialogFactory;
}


pageAdderView.prototype = {
	initialize: function () {
		
		this.on("addPage", this.options.addPage ? this.options.addPage : this.addPage);


		this.model = this.modelFactory.create("page", {
			author: this.currentUser.get("username"),
			pageTypeDescription: null
		});
		
		this.model.pageTypes = this.pageTypeRepo.getPageTypes();
		this.listenTo(this.model, "change:pageTypeKey", this.setPageTypeDescription);
		this.listenTo(this.model.pageTypes, "sync", this.setPageTypeDescription);
		this.on("component:detached", this.close);
	
		this.setPageTypeDescription();
	},
	
	setPageTypeDescription: function () {
		var pageTypeKey = this.model.get("pageTypeKey"),
			pageType = this.model.pageTypes.find(function (type) {
				return type.get("key") === pageTypeKey;
			});
		
		if (pageType) {
			this.model.set("pageTypeDescription", pageType.get("description"));
		}
	},

	submitForm: function (event) {
		event.preventDefault();

		if (!this.isModelValid()) {
			return;
		}

		this.trigger("addPage", this.model);
	},

	addPage: function (page) {
		var self = this;

		this.pageRepo.savePage(page, {
			clientError: function (response) {
				self.displayErrors(response.errors);
			},
			success: function () {
				var url = page.getUrl();
				window.location = url;
			}
		}, this);
	},
	
	cancel: function () {
		this.close();
	},

	onClose: function () {
		this.dialog && this.dialog.close();
	},

	onRender: function () {
		this.dialog = this.dialogFactory.create(this.$el, {
			title: "Add a page",
			modal: true
		});
	}
};


pageAdder.view("pageAdderView", [
	"options", "modelFactory", "currentUserRepo", "pageTypeRepo", "pageRepo", "dialogFactory",
	pageAdderView]);