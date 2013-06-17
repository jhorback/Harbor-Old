
links.view("linksNewView", function (navLinksRepo) {
	
	this.navLinksRepo = navLinksRepo;
	
}, {

	$inject: ["navLinksRepo"],
	
	events: {
		"click #navlinks-add": "add",
		"click #navlinks-create": "create"
	},

	render: function () {
		var selectEl;

		this.bindTemplate("Comps-Links-New");
		selectEl = this.$("#navlinks-select");
		this.navLinksRepo.getLinks().then(function (links) {
			_.each(links, function (link) {
				selectEl.append('<option value="' + link.id + '">' + link.name + '</option>');
			});
		});

	},

	add: function () {
		// navlinks-name
		alert("add");
	},

	create: function () {
		// navlinks-select
		alert("create");
	}
});
