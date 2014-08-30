

pageEditor.payPalButtonModel = function (attrs, options, appurl) {
	this.appurl = appurl;
};

pageEditor.payPalButtonModel.prototype = {
	syncPageProperties: ["payPalButtonID"]
};


pageEditor.model("payPalButtonModel", [
	"attrs",
	"options",
	"appurl",
	pageEditor.payPalButtonModel
]);
