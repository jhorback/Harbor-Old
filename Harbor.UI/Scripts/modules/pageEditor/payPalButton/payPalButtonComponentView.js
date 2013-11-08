

pageEditor.component("payPalButtonComponent", {
	regionEl: "#frame-body"
});



pageEditor.payPalButtonComponentView = function (options, currentPageRepo, payPalButtonRepo) {

	this.componentModel = options.componentModel;
	this.currentPageRepo = currentPageRepo;
	this.payPalButtonRepo = payPalButtonRepo;
};


pageEditor.payPalButtonComponentView.prototype = {
	initialize: function () {
		var id = this.componentModel.get("payPalButtonID");
		
		this.model = this.payPalButtonRepo.getButton(id);
	},
	
	onRender: function () {
		this.bindAll("saveButton", "saveComponentModel");
		this.listenTo(this.model, "change:id", this.saveComponentModel);
		this.listenTo(this.model, "change", this.saveButton);
	},
	
	saveComponentModel: function () {
		this.componentModel.set("payPalButtonID", this.model.get("id"));
		this.currentPageRepo.saveCurrentPage();
	},
	
	saveButton: function () {
		if (this.model.synced && this.model.isValid()) {
			this.payPalButtonRepo.saveButton(this.model);
		}
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