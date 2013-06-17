

var LinksRepo = function () {
	this.linksDfd = null;
	this.collection = new LinksCollection();
};

LinksRepo.prototype = {
	getLinks: function () {
		if (this.linksDfd === null) {
			this.linksDfd = this.collection.fetch();
		}
		return this.linksDfd;
	}
};