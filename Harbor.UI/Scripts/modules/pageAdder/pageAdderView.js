

function pageAdderView(
	options,
	modelFactory,
	currentUserRepo,
	pageTypeRepo,
	pageRepo
) {
	this.modelFactory = modelFactory;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageTypeRepo = pageTypeRepo;
	this.pageRepo = pageRepo;
}


pageAdderView.prototype = {
	initialize: function () {
		
		this.model = this.modelFactory.create("page", {
			author: this.currentUser.get("username"),
			hasOtherPageTypes: false
		});
		
		this.model.pageTypes = this.pageTypeRepo.createPageTypes();
		this.model.primaryPageTypes = this.pageTypeRepo.createPageTypes();
		this.model.otherPageTypes = this.pageTypeRepo.createPageTypes();

		this.listenTo(this.model.pageTypes, "sync", this.pageTypesSync);
		this.on("component:detached", this.close);
		this.on("addPage", this.options.addPage ? this.options.addPage : this.addPage);

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

	selectPageType: function (event, model) {
		this.model.set("pageTypeKey", model.id);

		if (!this.isModelValid()) {
			return;
		}

		this.trigger("addPage", this.model);
	},

	addPage: function (page) {
		var self = this;

		if (this.options.createPage === false) {
			this.options.onAddPage && this.options.onAddPage(page);
			return;
		}

		this.pageRepo.savePage(page, {
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
	
	submitForm: function (event) {
		event.preventDefault();
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
	"pageRepo",
	pageAdderView
]);