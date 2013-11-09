

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
		taxOverride: null,
		//
		priceUSD: null
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
	},
	"[priceUSD]": {
		get: function () {
			var n = this.get("price");
			return "$" + n.toFixed(2).replace(/./g, function(c, i, a) {
				return i && c !== "." && !((a.length - i) % 3) ? "," + c : c;
			});
		},
		bind: ["price"]
	}
};


payPalButtonModel.model("payPalButton", [
	"attrs",
	"options",
	"appurl",
	payPalButtonModel.payPalButton
]);