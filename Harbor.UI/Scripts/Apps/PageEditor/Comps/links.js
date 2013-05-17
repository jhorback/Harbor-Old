
var LinksComponent = PageComponent.extend({

	modelType: function () {
		return LinksComponent.Model;
	},

	initialize: function () {
		this.view = new PageLinkComponent.View({
			el: this.$el,
			model: this.model,
			uicid: this.uicid
		});
	},

	create: function () {
		this.open();
		this.view.openPageSelector();
	},

	open: function () {
		JSPM.install("PageSelector", function () {
			this.view.render();
		}, this);
	},

	close: function () {
		this.view.close();
	}
});

//"Comps-Links"

LinksComponent.Model = Application.Model.extend({
	defaults: {
		id: null,
		name: null,
		sections: []
	}
}, {
	pageProperties: ["id"],

	getDefaults: function (page, pageProperties) {
		return _.pick(page.getNavLinks(pageProperties.id),
			"name", "sections");
	}
});

// jch! - need url and api controller
LinksModel = Application.Model.extend({
	defaults: {
		id: null,
		name: null,
		userName: null,
		sections: [] // title, links 
	}
});

PageEditor.registerComponent("links", LinksComponent);