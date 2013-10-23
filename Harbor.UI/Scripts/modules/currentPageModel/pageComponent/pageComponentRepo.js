

function pageComponentRepo(
	ajaxRequest,
	collectionFactory
	) {

	var components;

	return {
		getPageComponents: function () {
			if (!components) {
				components = collectionFactory.create("pageComponents");
				ajaxRequest.handle(components.fetch());
			}
			return components;
		}
	};
}


currentPageModel.service("pageComponentRepo", [
	"ajaxRequest",
	"collectionFactory",
	pageComponentRepo]);