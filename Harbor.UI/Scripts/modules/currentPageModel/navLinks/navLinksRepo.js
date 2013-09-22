

currentPageModel.navLinksRepo = function (
	collectionFactory,
	ajaxRequest) {

	var links;

	return {
		getLinks: function () {
			if (!links) {
				links = collectionFactory.create("navLinksCollection");
				ajaxRequest.handle(links.fetch());
			}
			return links;
		}
	};
};



currentPageModel.service("navLinksRepo", [
	"collectionFactory",
	"ajaxRequest",
	currentPageModel.navLinksRepo
]);