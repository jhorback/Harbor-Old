Session.SignInModel = Application.Model.extend({
	defaults: {
		username: null,
		password: null,
		rememberMe: false
	},
	username: {
		validate: {
			required: true
		}
	}
});