
module("navLinks").service("navLinksRepo", ["collectionFactory", function (collectionFactory) {
	var linksDfd = null,
		
		collection = collectionFactory.create("navLinksCollection");
	
	return {
		getLinks: function () {
			
			if (linksDfd === null) {
				linksDfd = $.Deferred();
				collection.fetch().then(resolve).fail(linksDfd.reject);
			}

			return linksDfd;
		}
	};
	
	function resolve() {
		return linksDfd.resolve(collection);
	}

}]);