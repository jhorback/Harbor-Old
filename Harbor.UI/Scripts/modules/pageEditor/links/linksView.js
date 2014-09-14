
pageEditor.linksView = function (options) {

	this.bindAll("updateOrder");
};

pageEditor.linksView.prototype = {
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
		this.saveCurrentPage();
	}
};


pageEditor.view("linksView", [
	"options",
	pageEditor.linksView
]);

