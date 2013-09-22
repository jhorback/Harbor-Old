

function currentPageRepo(
	currentPageDto,
	globalCache,
	modelFactory,
	pageRepo
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
		}
	};
}


currentPageModel.service("currentPageRepo", [
	"currentPageDto",
	"globalCache",
	"modelFactory",
	"pageRepo",
	currentPageRepo]);