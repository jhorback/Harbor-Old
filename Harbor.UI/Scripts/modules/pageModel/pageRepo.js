

function pageRepo(collectionFactory, ajaxRequest) {

	return {
		// returns a new pages collection and calls
		// fetch with the specified data
		getPages: function (data) {
			var pages = collectionFactory.create("pages");
			ajaxRequest.handle(pages.fetch({ data: data }));
			return pages;
		},
		
		savePage: function (page, handler, proxy) {
			return ajaxRequest.handle(page.save(), handler, proxy);
		}
	};
}

pageModel.service("pageRepo", ["collectionFactory", "ajaxRequest", pageRepo]);
