

pageEditor.payPalButtonView = function (options, currentPageRepo) {

	this.currentPageRepo = currentPageRepo;
};


pageEditor.payPalButtonView.prototype = {
	initialize: function () {
		_.bindAll(this, "save", "selectPage");

		this.listenTo(this.model, "change:tileDisplay", this.save);
	},
	
	save: function () {
		this.currentPageRepo.saveCurrentPage();
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};



pageEditor.view("payPalButtonView", [
	"options",
	"currentPageRepo",
	pageEditor.payPalButtonView
]);



