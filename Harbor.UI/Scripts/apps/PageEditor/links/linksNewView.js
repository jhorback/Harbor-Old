
LinksComponent.NewView = Application.View.extend({

	events: {
		"click #navlinks-add": "add",
		"click #navlinks-create": "create"
	},

	initialize: function (options) {
		this.navLinksRepo = new LinksRepo(); // jch! - have this injected and move pageLinksRepo to the pageModel appjs module
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
