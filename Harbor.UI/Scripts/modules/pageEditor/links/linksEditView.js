
pageEditor.linksEditView = function (options, _) {

	this.bind = _.bind;

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

	onClose: function () {

	}
};


pageEditor.view("linksEditView", [
	"options",
	"_",
	pageEditor.linksEditView
]);
