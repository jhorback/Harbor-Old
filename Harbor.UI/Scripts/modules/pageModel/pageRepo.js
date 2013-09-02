

function pageRepo(collectionFactory, ajaxRequest) {

	return {
		// returns a new pages collection and calls
		// fetch with the specified data
		getPages: function (data) {
			var pages = collectionFactory.create("pages");
			ajaxRequest.handle(pages.fetch({ data: data }));
			return pages;
		}
	};
}

pageModel.service("pageRepo", ["collectionFactory", "ajaxRequest", pageRepo]);
