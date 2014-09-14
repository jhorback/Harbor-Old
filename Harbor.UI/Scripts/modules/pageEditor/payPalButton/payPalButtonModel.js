

pageEditor.paypalbuttonModel = function (attrs, options, modelFactory) {
	this.modelFactory = modelFactory;
};

pageEditor.paypalbuttonModel.prototype = {
	syncPageProperties: ["payPalButtonID"],

	defaults: {
		payPalButtonID: null,
		button: null
	},

	initialize: function () {
		this.payPalButton = this.modelFactory.create("payPalButton", this.attributes.button);
		this.listenTo(this.payPalButton, "change:id", this.idChanged);
	},

	idChanged: function () {
		this.set("payPalButtonID", this.payPalButton.id);
	},

	"[button]": {
		set: function (value) {
			this.payPalButton && this.payPalButton.set(value);
			return value;
		}
	}
};


pageEditor.model("paypalbuttonModel", [
	"attrs",
	"options",
	"modelFactory",
	pageEditor.paypalbuttonModel
]);
