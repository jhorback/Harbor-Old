

var payPalButtonModel = context.module("payPalButtonModel").use("bbext");


payPalButtonModel.payPalButtonRepo = function (ajaxRequest, modelFactory) {

	return {
		getPayPalButton: function (id) {
			var model = modelFactory.create("payPalButton", {
				id: id
			});
			if (id) {
				ajaxRequest.handle(model.fetch());
			}
			return model;
		},

		savePayPalButton: function (button, handler, proxy) {
			return ajaxRequest.handle(button.save(), handler, proxy);
		}
	};
};

payPalButtonModel.service("payPalButtonRepo", [
	"ajaxRequest",
	"modelFactory",
	payPalButtonModel.payPalButtonRepo
]);



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
		price: "0",
		shippingOverride: null,
		taxOverride: null
	},

	"[name]": {
		validate: {
			required: true
		}
	}
};


payPalButtonModel.model("payPalButton", [
	"attrs",
	"options",
	"appurl",
	payPalButtonModel.payPalButton
]);