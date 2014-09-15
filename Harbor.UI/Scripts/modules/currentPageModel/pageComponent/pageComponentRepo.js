

function pageComponentRepo(
	ajaxRequest,
	collectionFactory
	) {

	return {
		createPageComponents: function () {
			return collectionFactory.create("pageComponents");
		},

		fetchPageComponents: function (components, pageTypeKey) {
			return ajaxRequest.handle(components.fetch({
				data: {
					parentPageTypeKey: pageTypeKey
				}
			}));
		}
	};
}


currentPageModel.service("pageComponentRepo", [
	"ajaxRequest",
	"collectionFactory",
	pageComponentRepo
]);