

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
	"viewRenderer",
	pageEditor.payPalButtonComponentView
]);



pageEditor.payPalButtonView = function (options, appurl) {
	this.appurl = appurl;
};

pageEditor.payPalButtonView.prototype = {
	initialize: function () {
		this.listenTo(this.model, "change", this.render);
	},
	render: function () {
		var merchantID = "get it";
		var str = '<script src="' +
			this.appurl.get("scripts/paypal-button-minicart.min.js?merchant=" + merchantID) + '" ' +
			'data-button="' + this.model.get("buttonType") + '"' +
			'data-name="' + this.model.get("name") + '"' +
			'data-quantity="1"' +
			'data-amount="' + this.model.get("price") + '"' +
			'data-currency="USD"' +
			'></script>';
		/*
		attrs["data-button"] = button.ButtonType;
			attrs["data-name"] = button.Name;
			attrs["data-quantity"] = 1;
			attrs["data-amount"] = button.Price;
			attrs["data-currency"] = "USD";
			if (button.ShippingOverride != null)
			{
				attrs["data-shipping"] = button.ShippingOverride;
			}
			if (button.TaxOverride != null)
			{
				attrs["data-tax"] = button.TaxOverride;
			}*/

		this.$el.empty();
		this.$el.append($(str));
	}
};


pageEditor.view("payPalButtonView", [
	"options",
	"appurl",
	pageEditor.payPalButtonView
]);