

pageAdder.pageTypeModel = function (
	attrs,
	options,
	appurl
) {
	this.urlRoot = appurl.get("api/pagetypes");
};

pageAdder.pageTypeModel.prototype = {
	defaults: {
		key: null,
		name: null,
		description: null,
		isPrimaryToAdd: true
	},

	idAttribute: "key"
};

pageAdder.model("pageTypeModel", [
	"attrs",
	"options",
	"appurl",
	pageAdder.pageTypeModel
]);
