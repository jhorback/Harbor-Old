
pageEditor.linksEditView = function (options, componentManager) {

	this.componentManager = componentManager;
	this.bindAll("updateOrder");
};

pageEditor.linksEditView.prototype = {
	initialize: function () {
		this.listenTo(this.model, "save", this.save);
	},
	
	events: {
		"click a": function (event) {
			event.preventDefault();
		}
	},
	
	addSection: function () {
		this.model.addSection();
	},
	
	onRender: function () {
		
		this.$el.sortable({
			handle: "[data-rel=sectionSort]",
			items: ".menulist",
			revert: false,
			//containment: this.$el,
			tolerance: "pointer",
			update: this.updateOrder
		});
	},

	updateOrder: function () {
		this.model.sections.sort();
	},

	save: function () {
		this.model.page.save();
	}
};


pageEditor.view("linksEditView", [
	"options",
	"componentManager",
	pageEditor.linksEditView
]);


/* // jch! no longer need the new view - here for reference - can remove
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
		this.model.set(navLinks);
		this.model.set("navLinksID", navLinks.id);
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
*/