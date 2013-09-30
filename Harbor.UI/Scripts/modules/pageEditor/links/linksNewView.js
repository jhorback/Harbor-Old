


pageEditor.linksNewView = function (options, navLinksRepo) {

	this.navLinksRepo = navLinksRepo;
	this.model.navLinks = this.navLinksRepo.getLinks();
};

pageEditor.linksNewView.prototype = {

	add: function (event) {
		
		var id = parseInt(this.model.get("pageID")),
			model = this.model;
		
		// jch! - here on linksNewView
		this.navLinksRepo.getLinks().then(_.bind(function (links) {
			var link = links.findWhere({ id: id });
			model.set(link.attributes);
			model.set("pageID", link.get("id"));
			model.save().then(function () {
				model.trigger("save");
			});
			
		}, this));
	},

	create: function (event) {
		var thisModel = this.model;
		this.navLinksRepo.getLinks().then(_.bind(function (links) {
			var name = this.model.get("name");
			links.create({
				name: name
			}, {
				success: function (model) {
					thisModel.set("name", name);
					thisModel.save().then(function () {
						thisModel.trigger("save");
					});
				}
			});
		}, this));
		
	}
};


pageEditor.view("linksNewView", [
	"options",
	"navLinksRepo",
	pageEditor.linksNewView
]);
