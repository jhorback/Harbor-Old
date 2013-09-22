
currentPageModel.navLinksCollection = function (models, options, appurl) {

	this.url = appurl.get("api/navlinks");
};

currentPageModel.navLinksCollection.prototype = {
	model: "navLinks"
};


currentPageModel.collection("navLinksCollection", [
	"models",
	"options",
	"appurl",
	currentPageModel.navLinksCollection
]);