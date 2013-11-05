

pageEditor.payPalButtonModel = function (attrs, options, appurl) {
	this.appurl = appurl;
};

pageEditor.payPalButtonModel.prototype = {
	component:  {
		pageProperties: ["payPalButtonID"],
	
		getDefaults: function (page, pageProperties) {
			return _.pick(page.getPayPalButton(pageProperties.payPalButtonID),
				"name", "description", "hosted", "buttonCode", "buttonType", "itemNumber",
				"price", "shippingOverride", "taxOverride");
		}
	},
	
	defaults: {
		payPalButtonID: 0,
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
	
	hasButton: function () {
		return this.get("payPalButtonID") > 0 ? true : false;
	}
};


pageEditor.model("payPalButtonModel", [
	"attrs",
	"options",
	"appurl",
	pageEditor.payPalButtonModel
]);
