

currentPageModel.navLinksRepo = function (
	$,
	collectionFactory,
	ajaxRequest) {

	var links, linksDfd;

	return {
		getLinks: function () {
			if (!links) {
				links = collectionFactory.create("navLinksCollection");
				linksDfd = ajaxRequest.handle(links.fetch());
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
			var cachedLinks = this.getLinks(),
				dfd = $.Deferred();
			
			linksDfd.then(function () {
				var navLink = cachedLinks.get(link.get("id")),
					attrs = link.toJSON(),
					saveDfd = navLink.save(attrs);
				ajaxRequest.handle(saveDfd).then(dfd.resolve);
			});
			
			return dfd.promise();
		}
	};
};



currentPageModel.service("navLinksRepo", [
	"$",
	"collectionFactory",
	"ajaxRequest",
	currentPageModel.navLinksRepo
]);