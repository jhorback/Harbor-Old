

pageEditor.component("payPalButtonComponent", {
	region: "#frame-body"
});



pageEditor.payPalButtonComponentView = function (
	options,
	viewRenderer,
	payPalButtonRepo,
	payPalButtonRenderer
) {
	this.viewRenderer = viewRenderer;
	this.payPalButtonRepo = payPalButtonRepo;
	this.payPalButtonRenderer = payPalButtonRenderer;
	this.merchantID = options.merchantID;
};


pageEditor.payPalButtonComponentView.prototype = {
	initialize: function () {
		this.bindAll("saveButton");
		this.saveButton = _.debounce(this.saveButton, 200);
		this.listenTo(this.model, "change", this.buttonChanged);
	},
	
	onRender: function () {
		var previewEl;

		previewEl = this.$("[data-rel=buttonPreview]");
		this.payPalButtonRenderer.render(previewEl, this.model, this.merchantID);
	},

	buttonChanged: function () {
		this.saveButton();
		this.onRender();
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
	"payPalButtonRenderer",
	pageEditor.payPalButtonComponentView
]);
