Session.SignInView = Application.View.extend({

	initialize: function () {
		this.model = new Session.SignInModel();

		this.render();
	},

	events: {
		"submit form": function (event) {
			var displayErrors = _.bind(this.displayErrors, this),
				displayError = this.displayError;

			event.preventDefault();

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
		}
	},

	render: function () {
		this.bindTemplate("Session-SignIn");
		return this;
	}
});