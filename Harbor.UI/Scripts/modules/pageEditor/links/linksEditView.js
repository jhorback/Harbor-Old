
pageEditor.linksEditView = function (options) {


};

pageEditor.linksEditView.prototype = {
	onRender: function () {
		
	},

	onClose: function () {
		this.$el.css("font-weight", "normal");
	}
};


pageEditor.view("linksEditView", [
	"options",
	pageEditor.linksEditView
]);