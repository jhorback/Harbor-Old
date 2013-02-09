Settings.AppSettings = Application.Model.extend({
	
	url: Session.url("api/appsettings"),
	
	sync: function(method, model, options) {
		if (method === "create") {
			method = "update";
		}
		return Backbone.sync(method, model, options);
	},
	
	defaults: {
		applicationName: null,
		showSignInLink: true,
		homePageID: null,
		homePage: null,
		navigationLinks: [],
		theme: "default"
	},

	initialize: function () {
		this.homePage = new PageModels.Page(this.get("homePage"));
	},

	setHomePage: function (page) {
		if (!page) {
			this.homePage = null;
			this.set("homePageID", null);
		} else {		
			this.homePage = page;
			this.set("homePageID", page.get("id"));
		}
	},
	
	homePage: null,
	
	applicationName: {
		validate: {
			required: true
		}
	}
});
