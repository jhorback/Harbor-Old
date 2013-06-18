
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
		// navlinks-name
		var navLinks,
			id = parseInt(this.model.get("id"));

		if (!id) {
			return;
		}
		

		this.navLinksRepo.getLinks().then(_.bind(function (links) {
			this.model.set(links.findWhere({ id: id }).attributes);
			// jch! here - need to save the model
			// maybe just this.model.save()?
		}, this));
	},

	create: function () {
		// navlinks-select
		alert("create");
	}
});
