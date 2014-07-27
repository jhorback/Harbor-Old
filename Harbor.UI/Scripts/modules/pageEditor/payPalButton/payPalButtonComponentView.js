

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
		this.saveButton = _.debounce(this.saveButton, 200);
		this.bindAll("saveComponentModel", "saveButton");
		this.listenTo(this.model, "change:id", this.saveComponentModel);
		this.listenTo(this.model, "change", this.saveButton); // this was calling a bunch of times
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
		if (this.model.changedAttributes() === false) {
			return;
		}
		if (this.model.synced || this.model.isNew()) {
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
