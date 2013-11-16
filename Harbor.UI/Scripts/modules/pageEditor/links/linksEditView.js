
pageEditor.linksEditView = function (options, _, navLinksRepo, componentManager) {

	this.bind = _.bind;
	this.navLinksRepo = navLinksRepo;
	this.componentManager = componentManager;
};

pageEditor.linksEditView.prototype = {
	initialize: function () {
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
			update: this.bind(this.updateOrder, this)
		});
	},

	updateOrder: function () {
		this.model.sections.sort();
	},
	
	removeNavLink: function () {
		var warning = "WARNING\nYou are about to remove shared navigation links. "
			+ "This may effect other pages.\n\nAre you sure you want to remove these links?";
		if (confirm(warning)) {
			// call to navLinksRepo to delete
			this.navLinksRepo.deleteLink(this.model).then(this.bind(function () {
				this.componentManager.deleteComponent(this.options.uicid);
			}, this));
		}	
	}
};


pageEditor.view("linksEditView", [
	"options",
	"_",
	"navLinksRepo",
	"componentManager",
	pageEditor.linksEditView
]);
