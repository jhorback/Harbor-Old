

function currentPageRepo(
	currentPageDto,
	globalCache,
	modelFactory,
	pageRepo,
	console
	) {

	var currentPage = globalCache.get("currentPage") ||
		modelFactory.create("page", currentPageDto);

	globalCache.set("currentPage", currentPage);
	console.debug("currentPage", currentPage);
	
	return {
		getCurrentPage: function () {
			return currentPage;
		},
		
		saveCurrentPage: function (handler, proxy) {
			var dfd = pageRepo.savePage(currentPage, handler, proxy);
			return dfd.then(function () {
				globalCache.set("currentPage", currentPage);
			});
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
	"console",
	currentPageRepo]);