
module("navLinks").service("navLinksRepo", [
	"collectionFactory", "ajaxRequest",
function (collectionFactory, ajaxRequest) {
	var linksDfd = null,
		
		collection = collectionFactory.create("navLinksCollection");
	
	return {
		getLinks: function () {
			
			if (linksDfd === null) {
				linksDfd = $.Deferred();
				ajaxRequest.handle(collection.fetch()).then(resolve).fail(linksDfd.reject);
			}

			return linksDfd;
		}
	};
	
	function resolve() {
		return linksDfd.resolve(collection);
	}

}]);