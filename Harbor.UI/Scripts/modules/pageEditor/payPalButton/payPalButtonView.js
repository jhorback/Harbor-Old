

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