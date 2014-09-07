
pageEditor.linksEditView = function (options, currentPageRepo) {

	this.currentPageRepo = currentPageRepo;

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
		this.currentPageRepo.saveCurrentPage();
	}
};


pageEditor.view("linksEditView", [
	"options",
	"currentPageRepo",
	pageEditor.linksEditView
]);

