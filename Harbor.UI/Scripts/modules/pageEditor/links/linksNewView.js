


pageEditor.linksNewView = function (options, navLinksRepo) {

	this.navLinksRepo = navLinksRepo;
};

pageEditor.linksNewView.prototype = {
	initialize: function () {
		this.model.navLinks = this.navLinksRepo.getLinks();
	},

	add: function (event) {
		var pageID = parseInt(this.model.get("pageID")),
		    link = this.model.navLinks.findWhere({ id: pageID });
		
		this.model.set(link.attributes);
		this.model.set("pageID", pageID);
		this.saveAndTriggerSave();
	},

	create: function (event) {
		var name = this.model.get("name"),
		    navLinks;

		navLinks = this.model.navLinks.create({
			name: name
		}, {
			success: this.saveAndTriggerSave
		});

		this.model.set("name", name);
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
	"navLinksRepo",
	pageEditor.linksNewView
]);
