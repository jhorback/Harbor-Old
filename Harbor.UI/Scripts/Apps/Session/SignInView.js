﻿Session.SignInView = Backbone.View.extend({

	initialize: function () {
		Session.ViewExtension.extend(this);
		Session.FormErrorHandler.extend(this);

		this.model = new Session.SignInModel();

		this.render();
	},

	events: {
		"submit form": function (event) {
			var displayError = this.displayError;

			event.preventDefault();

			Session.signIn(this.model.toJSON(), {
				clientError: function (error) {
					displayError("", {"": [error] });
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