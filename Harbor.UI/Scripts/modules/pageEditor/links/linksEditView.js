
pageEditor.linksEditView = function (options) {


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

	},

	onClose: function () {

	}
};


pageEditor.view("linksEditView", [
	"options",
	pageEditor.linksEditView
]);
