

pageEditor.component("payPalButtonComponent", {
	region: "#frame-body"
});



pageEditor.payPalButtonComponentView = function (
	options,
	viewRenderer,
	payPalButtonRepo
) {
	this.viewRenderer = viewRenderer;
	this.payPalButtonRepo = payPalButtonRepo;
};


pageEditor.payPalButtonComponentView.prototype = {
	initialize: function () {
		this.bindAll("saveButton");
		this.saveButton = _.debounce(this.saveButton, 200);
		this.listenTo(this.model, "change", this.saveButton);
	},
	
	onRender: function () {
		var previewEl;

		previewEl = this.$("[data-rel=buttonPreview]");
		//this.viewRenderer.render("paypalbuttonView", {
		//	el: previewEl,
		//	model: this.model
		//});
	},
	
	saveButton: function () {
		if (this.model.changedAttributes() === false) {
			return;
		}
		
		if (this.isModelValid()) {
			this.model.set("doneButtonText", "Done");	
			this.payPalButtonRepo.saveButton(this.model);
		} else {
			this.model.set("doneButtonText", "Cancel");
		}
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};


pageEditor.view("payPalButtonComponentView", [
	"options",
	"viewRenderer",
	"payPalButtonRepo",
	pageEditor.payPalButtonComponentView
]);
