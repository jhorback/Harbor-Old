

function currentPageRepo(
	currentPageDto,
	globalCache,
	modelFactory,
	pageRepo,
	ajaxRequest,
	collectionFactory
	) {

	var currentPage = globalCache.get("currentPage") ||
		modelFactory.create("page", currentPageDto);

	globalCache.set("currentPage", currentPage);
	
	return {
		getCurrentPage: function () {
			return currentPage;
		},
		
		saveCurrentPage: function (handler, proxy) {
			pageRepo.savePage(currentPage, handler, proxy);
			globalCache.set("currentPage", currentPage);
		},
		
		deleteCurrentPage: function () {
			return currentPage.destroy();
		},
		
		getPageComponents: function () {
			var components = collectionFactory.create("pageComponents");
			ajaxRequest.handle(components.fetch());
			return components;
		}
	};
}


currentPageModel.service("currentPageRepo", [
	"currentPageDto",
	"globalCache",
	"modelFactory",
	"pageRepo",
	"ajaxRequest",
	"collectionFactory",
	currentPageRepo]);