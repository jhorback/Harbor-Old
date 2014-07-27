﻿

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
		priceUSD: null,
		doneButtonText: "Done"
	},

	"[name]": {
		validate: {
			required: true
		}
	},
	
	"[price]": {
		get: function (value) {
			return Number(value).toFixed(2);
		},
		set: function (value) {
			return Number(value).toFixed(2);
		}
	},
	"[priceUSD]": {
		get: function () {
			var n = Number(this.get("price"));
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