
module("navLinks").service("navLinksRepo", ["collectionFactory", function (collectionFactory) {
	var linksDfd = null,
		
		collection = collectionFactory.create("navLinksCollection");
	
	return {
		getLinks: function () {
			if (linksDfd === null) {
				linksDfd = $.Deferred();
				collection.fetch().then(function () {
					linksDfd.resolve(collection);
				}).fail(linksDfd.fail);
			}

			return linksDfd;
		}
	};

}]);