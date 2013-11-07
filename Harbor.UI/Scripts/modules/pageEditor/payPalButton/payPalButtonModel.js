

pageEditor.payPalButtonModel = function (attrs, options, appurl) {
	this.appurl = appurl;
};

pageEditor.payPalButtonModel.prototype = {
	component:  {
		pageProperties: ["payPalButtonID"]
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
