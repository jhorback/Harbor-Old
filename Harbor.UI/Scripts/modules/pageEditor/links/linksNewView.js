


pageEditor.linksNewView = function (options, navLinksRepo, currentPageRepo) {
	this.bindAll("saveAndTriggerSave", "addNavLinksToPageAndSave");

	this.navLinksRepo = navLinksRepo;
	this.currentPageRepo = currentPageRepo;
};

pageEditor.linksNewView.prototype = {
	initialize: function () {
		this.model.navLinks = this.navLinksRepo.getLinks();
	},

	add: function (event) {
		var navLinksID = parseInt(this.model.get("navLinksID")),
		    link = this.model.navLinks.findWhere({ id: navLinksID });
		
		event.preventDefault();
		this.model.set(link.attributes);
		this.model.set("navLinksID", navLinksID);
		this.saveAndTriggerSave({ savePage: true});
	},

	create: function (event) {
		var name = this.model.get("name");

		event.preventDefault();
		if (this.isModelValid() === false) {
			return;
		}
		
		this.model.set("name", name);
		this.navLinksRepo.createLink({
			name: name
		}, {
			clientError: function (response) {
				this.displayErrors(response.errors);
			},
			success: this.addNavLinksToPageAndSave
		}, this);
	},
	
	addNavLinksToPageAndSave: function (navLinks) {
		var page = this.currentPageRepo.getCurrentPage();
		
		page.addNavLinksRef(navLinks);
		this.saveAndTriggerSave();
	},
	
	saveAndTriggerSave: function (options) {
		var model = this.model;
		
		model.save(options).then(function () {
			model.trigger("save");
		});
	}
};


pageEditor.view("linksNewView", [
	"options",
	"navLinksRepo",
	"currentPageRepo",
	pageEditor.linksNewView
]);
