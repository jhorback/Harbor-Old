Session.SignInView = Application.View.extend({

	// jch! really want to be able to inject these views
	constructor: function (options, authenticationProvider) {
		this.auth = authenticationProvider;
		
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
				displayError = this.displayError;

		// jch! - inject here - this.auth.signIn(
		Session.signIn(this.model.toJSON(), {
			clientError: function (error) {
				var errors = new ModelErrors();
				errors.add("<h1>Sign in failed</h1>" + error);
				displayErrors(errors.toJSON());
			},
			success: function () {
				displayError("");
			}
		});
	},

	render: function () {
		this.bindTemplate("Session-SignIn");
	}
});