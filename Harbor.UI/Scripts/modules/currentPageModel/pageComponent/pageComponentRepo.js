

function currentPageRepo(
	ajaxRequest,
	collectionFactory
	) {

	return {
		getPageComponents: function () {
			var components = collectionFactory.create("pageComponents");
			ajaxRequest.handle(components.fetch());
			return components;
		}
	};
}


currentPageModel.service("pageComponentRepo", [
	"ajaxRequest",
	"collectionFactory",
	currentPageRepo]);