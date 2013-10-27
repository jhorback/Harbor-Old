

function pageRepo(collectionFactory, ajaxRequest) {

	return {
		// returns a new pages collection and calls
		// fetch with the specified data
		getPages: function (data) {
			var pages = this.createPages();
			this.fetchPages(pages, data);
			return pages;
		},
		
		createPages: function () {
			return collectionFactory.create("pages");
		},
		
		fetchPages: function (pages, data) {
			return ajaxRequest.handle(pages.fetch({ data: data }));
		},

		savePage: function (page, handler, proxy) {
			return page.hasChanged() ?
				ajaxRequest.handle(page.save(), handler, proxy) :
				ajaxRequest.resolved();
		}
	};
}

pageModel.service("pageRepo", ["collectionFactory", "ajaxRequest", pageRepo]);
