


pageEditor.linksNewView = function (options, _, navLinksRepo, currentPageRepo) {
	_.bindAll(this, "saveAndTriggerSave", "addNavLinksAndSave");

	this.navLinksRepo = navLinksRepo;
	this.currentPageRepo = currentPageRepo;
};

pageEditor.linksNewView.prototype = {
	initialize: function () {
		this.model.navLinks = this.navLinksRepo.getLinks();
	},

	add: function (event) {
		var pageID = parseInt(this.model.get("pageID")),
		    link = this.model.navLinks.findWhere({ id: pageID });
		
		event.preventDefault();
		this.model.set(link.attributes);
		this.model.set("pageID", pageID);
		this.saveAndTriggerSave();
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
		}).then(this.addNavLinksToPageAndSave);
	},
	
	addNavLinksToPageAndSave: function (navLinks) {
		var page = this.currentPageRepo.getCurrentPage();
		
		page.addNavLinksRef(navLinks);
		this.saveAndTriggerSave();
	},
	
	saveAndTriggerSave: function () {
		var model = this.model;
		
		model.save().then(function () {
			model.trigger("save");
		});
	}
};


pageEditor.view("linksNewView", [
	"options",
	"_",
	"navLinksRepo",
	"currentPageRepo",
	pageEditor.linksNewView
]);
