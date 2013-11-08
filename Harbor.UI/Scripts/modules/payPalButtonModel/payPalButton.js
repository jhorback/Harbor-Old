

payPalButtonModel.payPalButton = function (attrs, options, appurl) {
	this.urlRoot = appurl.get("api/paypalbuttons");
};

payPalButtonModel.payPalButton.prototype = {
	defaults: {
		id: null,
		name: "",
		description: "",
		hosted: false,
		buttonCode: null,
		buttonType: "buynow",
		itemNumber: "",
		price: 0,
		shippingOverride: null,
		taxOverride: null
	},

	"[name]": {
		validate: {
			required: true
		}
	},
	
	"[price]": {
		get: function (value) {
			return parseInt(value);
		},
		set: function (value) {
			return parseInt(value);
		}
	}
};


payPalButtonModel.model("payPalButton", [
	"attrs",
	"options",
	"appurl",
	payPalButtonModel.payPalButton
]);