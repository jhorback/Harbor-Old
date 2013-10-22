Session.SignInView = Application.View.extend({

	constructor: function (options) {
		// authenticationProvider
		// this.auth = authenticationProvider;
		
		Backbone.View.apply(this, arguments);
	},

	events: {
		"submit form": function (event) {
			event.preventDefault();
			this.signIn();
		}
	},
	
	initialize: function () {
		if (Session.currentUser.get("isAuthenticated") &&
			window.location.toString().toLowerCase().indexOf("returnurl") > -1) {
			this.showError("Permission Denied", "You do not have permission to view the requested page.");
		}
	},
	
	signIn: function () {
		var showError = _.bind(this.showError, this),
			clearErrors = _.bind(this.clearErrors, this);
		
		Session.signIn(this.model.toJSON(), {
			clientError: function (error) {
				showError("Sign in failed", error);
			},
			success: function () {
				clearErrors();
			}
		});
	},
	
	showError: function (error, message) {
		var displayErrors = _.bind(this.displayErrors, this);

		setTimeout(function () {
			context.app("session").call(["modelErrors", function (modelErrors) {
				var errors = modelErrors.create();
				errors.add("<h1>" + error + "</h1><p>" + message + "</p>");
				displayErrors(errors.toJSON());
			}]);
		}, 1);
	},

	render: function () {
		this.bindTemplate("Session-SignIn");
	}
});