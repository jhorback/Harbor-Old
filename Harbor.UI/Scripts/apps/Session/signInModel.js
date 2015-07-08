session.signInModel = {
	defaults: {
		username: null,
		password: null,
		rememberMe: false
	},

	"[username]": {
		validate: {
			required: true
		}
	}
};

session.model("signInModel", session.signInModel);
