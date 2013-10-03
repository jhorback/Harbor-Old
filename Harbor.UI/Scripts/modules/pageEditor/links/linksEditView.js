
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
	
	onRender: function () {

	},

	onClose: function () {

	}
};


pageEditor.view("linksEditView", [
	"options",
	pageEditor.linksEditView
]);