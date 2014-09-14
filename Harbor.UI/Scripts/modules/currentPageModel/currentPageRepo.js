

function currentPageRepo(
	currentPageDto,
	globalCache,
	modelFactory,
	pageRepo,
	console
	) {

	var currentPage = globalCache.get("currentPage");
	// console.debug("currentPageDto", currentPageDto);
	
	return {
		getCurrentPage: function () {
			if (!currentPage) {
				currentPage =  modelFactory.create("page", currentPageDto);
				globalCache.set("currentPage", currentPage);
			}
			return currentPage;
		},
		
		saveCurrentPage: function (handler, proxy) {
			var page = currentPage || globalCache.get("currentPage"),
				dfd = pageRepo.savePage(page, handler, proxy);

			dfd.then(function () {
				globalCache.set("currentPage", page);
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