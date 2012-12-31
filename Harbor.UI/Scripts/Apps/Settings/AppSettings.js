Settings.AppSettings = Backbone.Model.extend({
	url: Session.url("api/appsettings"),
	sync: function(method, model, options) {
		if (method === "create") {
			method = "update";
		}
		return Backbone.sync(method, model, options);
    },
	defaults: {
		applicationName: null,
		showSignInLink: true
	},

	initialize: function () {
		//Session.GetSetModelExtension.extend(this);
		Session.ValidationModelExtension.extend(this);
	},

	applicationName: {
		validate: {
			required: true
		}
	}
});
