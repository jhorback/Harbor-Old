

pageEditor.component("payPalButtonComponent", {
	regionEl: "#frame-body"
});



pageEditor.payPalButtonComponentView = function (options, currentPageRepo, payPalButtonRepo, viewRenderer) {

	this.componentModel = options.componentModel;
	this.currentPageRepo = currentPageRepo;
	this.payPalButtonRepo = payPalButtonRepo;
	this.viewRenderer = viewRenderer;
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
		
		// jch! cleanup
		var previewEl = this.$("[data-rel=buttonPreview]");
		this.viewRenderer.render("payPalButtonView", {
			el: previewEl,
			model: this.model
		});
	},
	
	saveComponentModel: function () {
		this.componentModel.set("payPalButtonID", this.model.get("id"));
		this.currentPageRepo.saveCurrentPage();
	},
	
	saveButton: function () {
		if ((this.model.synced || this.model.isNew())) {
			if (this.isModelValid()) {
				this.payPalButtonRepo.saveButton(this.model);
			}
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
	"viewRenderer",
	pageEditor.payPalButtonComponentView
]);
