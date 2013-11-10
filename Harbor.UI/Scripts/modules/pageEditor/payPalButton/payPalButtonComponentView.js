

pageEditor.component("payPalButtonComponent", {
	regionEl: "#frame-body"
});



pageEditor.payPalButtonComponentView = function (
	options,
	currentPageRepo,
	viewRenderer,
	payPalButtonRepo
) {
	this.currentPageRepo = currentPageRepo;
	this.viewRenderer = viewRenderer;
	this.payPalButtonRepo = payPalButtonRepo;
};


pageEditor.payPalButtonComponentView.prototype = {
	initialize: function () {
		this.bindAll("saveComponentModel", "saveButton");
	},
	
	onRender: function () {
		var previewEl;
		
		this.bindAll("saveButton", "saveComponentModel");
		this.listenTo(this.model, "change:id", this.saveComponentModel);
		this.listenTo(this.model, "change", this.saveButton);
		
		previewEl = this.$("[data-rel=buttonPreview]");
		this.viewRenderer.render("payPalButtonView", {
			el: previewEl,
			model: this.model
		});
	},
	
	saveComponentModel: function () {
		this.currentPageRepo.saveCurrentPage();
	},
	
	saveButton: function () {
		if ((this.model.synced || this.model.isNew())) {
			if (this.isModelValid()) {
				this.model.set("doneButtonText", "Done");	
				this.payPalButtonRepo.saveButton(this.model);
			} else {
				this.model.set("doneButtonText", "Cancel");
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
	"viewRenderer",
	"payPalButtonRepo",
	pageEditor.payPalButtonComponentView
]);
