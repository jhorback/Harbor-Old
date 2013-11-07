

pageEditor.component("payPalButton", {
	regionEl: ".page-body"
});



pageEditor.payPalButtonView = function (options, currentPageRepo) {

	this.currentPageRepo = currentPageRepo;
};


pageEditor.payPalButtonView.prototype = {
	initialize: function () {
		this.bindAll("save");

		this.listenTo(this.model, "change:payPalButtonID", this.save);
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