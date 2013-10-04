
pageEditor.linksEditView = function (options) {


};

pageEditor.linksEditView.prototype = {
	initialize: function () {
	},
	
	events: {
		"click a": function (event) {
			event.preventDefault();
		},
		
		"click [data-event=addLink]": "addLink"
	},
	
	addSection: function () {
		this.model.sections.add({});
	},
	
	addLink: function () {
		alert("add link");
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