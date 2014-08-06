

function currentPageRepo(
	currentPageDto,
	globalCache,
	modelFactory,
	pageRepo,
	console
	) {

	var currentPage = globalCache.get("currentPage");
	console.debug("currentPageDto", currentPageDto);
	
	return {
		getCurrentPage: function () {
			if (!currentPage) {
				currentPage =  modelFactory.create("page", currentPageDto);
				globalCache.set("currentPage", currentPage);
			}
			return currentPage;
		},
		
		saveCurrentPage: function (handler, proxy) {
			var dfd = pageRepo.savePage(currentPage, handler, proxy);
			dfd.then(function () {
				globalCache.set("currentPage", currentPage);
			});
			return dfd;
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