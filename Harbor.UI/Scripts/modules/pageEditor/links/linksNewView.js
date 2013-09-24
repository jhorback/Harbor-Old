


pageEditor.linksNewView = function (options, navLinksRepo) {

	this.navLinksRepo = navLinksRepo;

};

pageEditor.linksNewView.prototype = {
	
	initialize: function () {
		this.model.links = this.navLinksRepo.getLinks();
	},

	events: {
		"click #navlinks-add": "add",
		"click #navlinks-create": "create"
	},
	
	onRender: function () {
		var selectEl = this.$("#navlinks-select");
		this.model.links.each(function (link) {
			selectEl.append('<option value="' + link.get("id") + '">' + link.get("name") + '</option>');
		});
	},

	add: function () {
		alert("add!!!");
		return;
		var id = parseInt(this.model.get("pageID")),
			model = this.model;

		if (!id) {
			return;
		}
		
		this.navLinksRepo.getLinks().then(_.bind(function (links) {
			var link = links.findWhere({ id: id });
			model.set(link.attributes);
			model.set("pageID", link.get("id"));
			model.save().then(function () {
				model.trigger("save");
			});
			
		}, this));
	},

	create: function () {
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
