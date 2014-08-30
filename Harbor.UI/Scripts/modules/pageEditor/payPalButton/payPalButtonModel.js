

pageEditor.payPalButtonModel = function (attrs, options, appurl) {
	this.appurl = appurl;
};

pageEditor.payPalButtonModel.prototype = {
	syncPageProperties: ["payPalButtonID"],
	
	hasButton: function () {
		var id = this.get("payPalButtonID"),
			hasButton = id == 0 ? false : (this.page.getPayPalButton(id) ? true : false);
		return hasButton;
	}
};


pageEditor.model("payPalButtonModel", [
	"attrs",
	"options",
	"appurl",
	pageEditor.payPalButtonModel
]);
