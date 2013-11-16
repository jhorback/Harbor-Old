

currentPageModel.navLinksRepo = function (
	$,
	_,
	collectionFactory,
	modelFactory,
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
		createLink: function (link, handler, proxy) {
			var cachedLinks = this.getLinks(),
			    dfd = $.Deferred(),
			    model;

			model = modelFactory.create("navLinks", link);
			ajaxRequest.handle(model.save(), handler, proxy).then(_.bind(function () {
				cachedLinks.add(model);
				dfd.resolve.call(this, arguments);
			}, this));
			
			return dfd.promise();
		},
		
		updateLink: function (link) {
			var cachedLinks = this.getLinks(),
				dfd = $.Deferred();

			linksDfd.then(function () {
				var navLink = cachedLinks.get(link.get("id")),
				    attrs, saveDfd;
				
				if (!navLink) {
					dfd.resolve();
				} else {
					attrs = link.toJSON(),
					saveDfd = navLink.save(attrs);
					ajaxRequest.handle(saveDfd).then(dfd.resolve);
				}
			});
			
			return dfd.promise();
		},
		
		deleteLink: function (link) {
			
			var cachedLinks = this.getLinks(),
				dfd = $.Deferred();

			linksDfd.then(function () {
				var navLink = cachedLinks.get(link.get("id")),
					attrs = link.toJSON(),
					destroyDfd = navLink.destroy();
				link.clear();
				ajaxRequest.handle(destroyDfd).then(dfd.resolve);
			});

			return dfd.promise();
		}
	};
};



currentPageModel.service("navLinksRepo", [
	"$",
	"_",
	"collectionFactory",
	"modelFactory",
	"ajaxRequest",
	currentPageModel.navLinksRepo
]);