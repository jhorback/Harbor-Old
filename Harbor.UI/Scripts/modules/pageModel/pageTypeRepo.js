
function pageTypeRepo(collectionFactory, ajaxRequest) {
	return {
		getPageTypes: function (data) {
			var pages = collectionFactory.create("pageTypes");
			ajaxRequest.handle(pages.fetch({ data: data }));
			return pages;
		}
	};
}

pageModel.service("pageTypeRepo", ["collectionFactory", "ajaxRequest", pageTypeRepo]);