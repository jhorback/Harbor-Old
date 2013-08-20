Session.SignInView = Application.View.extend({

	// jch! really want to be able to inject these views
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
	
	signIn: function () {
		var displayErrors = _.bind(this.displayErrors, this),
				clearErrors = this.clearErrors;

		// jch! - inject here - this.auth.signIn(
		Session.signIn(this.model.toJSON(), {
			clientError: function (error) {
				context.app("session").call(["modelErrors", function (modelErrors) {
					var errors = modelErrors.create();
					errors.add("<h1>Sign in failed</h1>" + error);
					displayErrors(errors.toJSON());
				}]);
				
			},
			success: function () {
				clearErrors();
			}
		});
	},

	render: function () {
		this.bindTemplate("Session-SignIn");
	}
});