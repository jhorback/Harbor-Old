

pageEditor.component("payPalButtonComponent", {
	regionEl: ".page-body"
});



pageEditor.payPalButtonComponentView = function (options, currentPageRepo, payPalButtonRepo) {

	this.componentModel = options.componentModel;
	this.currentPageRepo = currentPageRepo;
	this.payPalButtonRepo = payPalButtonRepo;
};


pageEditor.payPalButtonComponentView.prototype = {
	initialize: function () {
		this.bindAll("saveButton", "saveComponentModel");

		this.model = this.payPalButtonRepo.getPayPalButton(this.componentModel.get("payPalButtonID"));
		this.listenTo(this.model, "change:id", this.saveComponentModel);
		this.listenTo(this.model, "change", this.saveButton);
	},
	
	saveComponentModel: function () {
		this.componentModel.set("payPalButtonID", this.model.get("id"));
		this.currentPageRepo.saveCurrentPage();
	},
	
	saveButton: function () {
		this.payPalButtonRepo.savePayPalButton(this.model);
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};


pageEditor.view("payPalButtonComponentView", [
	"options",
	"currentPageRepo",
	"payPalButtonRepo",
	pageEditor.payPalButtonComponentView
]);