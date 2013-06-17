
module("navLinks").service("navLinksRepo", function (collectionFactory) {

	this.linksDfd = null;
	this.collection = collectionFactory.create("navLinksCollection");
	
}, {
	$inject: ["collectionFactory"],
	
	getLinks: function () {
		if (this.linksDfd === null) {
			this.linksDfd = this.collection.fetch();
		}
		
		return this.linksDfd;
	}
});