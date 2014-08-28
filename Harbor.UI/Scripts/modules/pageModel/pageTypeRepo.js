
function pageTypeRepo(collectionFactory, ajaxRequest) {
	return {
		createPageTypes: function () {
			var pageTypes = collectionFactory.create("pageTypes");
			return pageTypes;
		},

		fetchPageTypes: function (pageTypes, parentPageTypeKey) {
			
			return ajaxRequest.handle(pageTypes.fetch({
				data: {
					parentPageTypeKey: parentPageTypeKey
				}
			}));
		}
	};
}


pageModel.service("pageTypeRepo", ["collectionFactory", "ajaxRequest", pageTypeRepo]);