

currentPageModel.navLinksRepo = function (
	$,
	collectionFactory,
	ajaxRequest) {

	var links;

	return {
		getLinks: function () {
			if (!links) {
				links = collectionFactory.create("navLinksCollection");
				ajaxRequest.handle(links.fetch());
			}
			return links;
		},
		
		/// link - minimaly, an object with a name property
		createLink: function (link) {
			var cachedLinks = this.getLinks(),
				dfd = $.Deferred();
			
			cachedLinks.create(link, {
				success: function (model, response, options) {
					dfd.resolve(model, response, options);
				}
			});
			
			return dfd.promise();
		},
		
		updateLink: function (link) {
			// jch! - here need to get the link upate it and save it!?!
			var cachedLinks = this.getLinks(),
				dfd = $.Deferred();
			
			var navLink = cachedLinks.get(link.get("id"));
			return ajaxRequest.handle(navLink.save(link));
			// return dfd.promise(); jch - do i have to wait for getLinks()?
		}
	};
};



currentPageModel.service("navLinksRepo", [
	"$",
	"collectionFactory",
	"ajaxRequest",
	currentPageModel.navLinksRepo
]);