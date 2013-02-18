Session.SignInView = Backbone.View.extend({

	initialize: function () {
		Session.ViewExtension.extend(this);
		Session.FormErrorHandler.extend(this);

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
		var $el = this.$el,
			model = this.model;

		var html = this.JST("Session-SignIn", this.model).then(function (result) {
			$el.html(result);
			Session.ModelBinder(model, $el);
		});

		return this;
	}
});