
links.view("linksNewView", function (options, navLinksRepo) {
	
	this.navLinksRepo = navLinksRepo;
	
}, {

	$inject: ["options", "navLinksRepo"],
	
	events: {
		"click #navlinks-add": "add",
		"click #navlinks-create": "create"
	},

	render: function () {
		var selectEl;

		this.bindTemplate("Links-New");
		selectEl = this.$("#navlinks-select");
		this.navLinksRepo.getLinks().then(function (links) {
			links.each(function (link) {
				selectEl.append('<option value="' + link.get("id") + '">' + link.get("name") + '</option>');
			});
		});
	},

	add: function () {
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
		// navlinks-select
		alert("create");
	}
});
