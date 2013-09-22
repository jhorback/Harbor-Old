
currentPageModel.pageComponents = function (models, options, appurl) {

	this.url = appurl.get("api/pagecomponents");
};

currentPageModel.pageComponents.prototype = {
	model: "pageComponent"
};


currentPageModel.collection("pageComponents", [
	"models", "options", "appurl",
	currentPageModel.pageComponents]);