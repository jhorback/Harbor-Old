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
		theme: "default",
		thumbUrl: null,
		footerHtml: null,
		parsedFooterHtml: null
	},

	initialize: function () {
		var self = this;
		
		this.on("sync", function () {
			settings.call(["modelFactory", function (modelFactory) {
				var homePage = modelFactory.create("page", self.get("homePage"));
				self.set("thumbUrl", homePage.get("thumbUrl"));
			}]);
		});
	},

	setHomePage: function (page) {
		if (!page) {
			this.homePage = null;
			this.set("homePageID", null);
		} else {		
			this.homePage = page;
			this.set({
				"homePageID": page.get("id"),
				"thumbUrl": page.get("thumbUrl")
			});
		}
	},
	
	footerHtml: {
		set: function (value) {
			return $("<div>" + value + "</value>").html();
		}
	},

	homePage: null,
	
	applicationName: {
		validate: {
			required: true
		}
	}
});
