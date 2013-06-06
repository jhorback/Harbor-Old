

var LinksComponent = PageComponent.extend({

	modelType: function () {
		return LinksComponent.Model;
	},

	initialize: function () {
	},

	create: function () {
		this.open();
		this.getView().openPageSelector();
	},

	open: function () {
		JSPM.install("PageSelector", function () {
			this.getView().render();
		}, this);
	},
	
	getView: function () {
		this.view && this.view.close();
		if (this.model.hasName()) {
			this.view = new LinksComponent.EditView({
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});
		} else {
			this.view = new LinksComponent.NewView({
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});
		}
		return this.view;
	},

	close: function () {
		this.view.close();
	}
});


LinksComponent.Model = Application.Model.extend({
	defaults: {
		id: null,
		name: null,
		sections: []
	},
	
	hasName: function () {
		return this.get("name") ? true : false;
	}
	
}, {
	pageProperties: ["id"],

	getDefaults: function (page, pageProperties) {
		if (pageProperties.id) {
			return _.pick(page.getNavLinks(pageProperties.id),
				"name", "sections");
		}
		return {};
	}
});


PageEditor.registerComponent("links", LinksComponent);


LinksComponent.NewView = Application.View.extend({

	events: {
		"click #navlinks-add": "add",
		"click #navlinks-create": "create"
	},

	constructor: function (options, navLinksRepo) {
		this.navLinksRepo = navLinksRepo;
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



LinksComponent.EditView = Application.View.extend({
	render: function () {
		this.renderTemplate("Comps-Links-Edit");
	}
});



var LinksModel = Application.Model.extend({
	defaults: {
		id: null,
		name: null,
		userName: null,
		sections: [] // title, links 
	}
});


var LinksCollection = Backbone.Collection.extend({
	model: LinksModel,
	url: Application.url("api/navlinks")
});





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
IOC.register("navLinksRepo", LinksRepo);