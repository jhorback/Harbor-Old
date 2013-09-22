
currentPageModel.pageComponent = function (attrs, options, appurl) {

	this.urlRoot = appurl.get("api/pagecomponents");
	
};

currentPageModel.pageComponent.prototype = {
	idAttribute: "key",
	defaults: {
		key: null,
		type: null,
		name: null,
		description: null
	}
};


currentPageModel.model("pageComponent", [
	"attrs", "options", "appurl",
	currentPageModel.pageComponent]);