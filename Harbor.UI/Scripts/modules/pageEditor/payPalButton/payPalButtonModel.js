

pageEditor.paypalbuttonModel = function (attrs, options, appurl) {
	this.appurl = appurl;
};

pageEditor.paypalbuttonModel.prototype = {
	syncPageProperties: ["payPalButtonID"],

	defaults: {
		payPalButtonId: null
	}
};


pageEditor.model("paypalbuttonModel", [
	"attrs",
	"options",
	"appurl",
	pageEditor.paypalbuttonModel
]);
