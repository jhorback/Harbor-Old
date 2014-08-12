

function pageRepo(_, collectionFactory, ajaxRequest) {

	return {
		// returns a new pages collection and calls
		// fetch with the specified data
		getPages: function (data, pageData) {
			var pages = this.createPages();
				
			data = data || {};
			pageData = pageData || { take: 20, skip: 0, orderDesc: "modified" };

			this.fetchPages(pages, _.extend(data, pageData));
			return pages;
		},
		
		createPages: function () {
			return collectionFactory.create("pages");
		},
		
		fetchPages: function (pages, data) {
			return ajaxRequest.handle(pages.fetch({ data: data }));
		},

		savePage: function (page, handler, proxy) {
			var pageSaved = page.safeSave();
			if (!pageSaved) {
				return ajaxRequest.resolved();
			}
			return ajaxRequest.handle(pageSaved, handler, proxy);
		}
	};
}

pageModel.service("pageRepo", [
	"_",
	"collectionFactory",
	"ajaxRequest",
	pageRepo
]);
