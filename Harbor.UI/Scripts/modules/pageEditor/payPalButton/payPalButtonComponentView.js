

pageEditor.component("payPalButtonComponent", {
	region: "#frame-body"
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

		this.bindAll("saveButton", "saveComponentModel");
		this.listenTo(this.model, "change:id", this.saveComponentModel);
		// this.listenTo(this.model, "change", this.saveButton); this was calling a bunch of times
	},
	
	onRender: function () {
		var previewEl;
		
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
		var notInDatabase = !this.model.attributes.name;
		if ((this.model.synced || notInDatabase)) {
			if (this.isModelValid()) {
				this.model.set("doneButtonText", "Done");	
				this.payPalButtonRepo.saveButton(this.model);
			} else {
				this.model.set("doneButtonText", "Cancel");
			}
		}
	},
	
	onClose: function () {
		this.saveButton();
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
