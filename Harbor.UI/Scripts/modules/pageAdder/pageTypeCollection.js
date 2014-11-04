

pageAdder.pageTypeCollection = function (
	models,
	options,
	appurl
) {
	this.url = appurl.get("api/pagetypes");
}

pageAdder.pageTypeCollection.prototype = {
	model: "pageTypeModel"
};

pageAdder.collection("pageTypeCollection", [
	"models",
	"options",
	"appurl",
	pageAdder.pageTypeCollection
]);
