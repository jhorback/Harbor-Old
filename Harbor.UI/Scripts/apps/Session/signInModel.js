session.signInModel = function (attrs, options) {
};

session.signInModel.prototype = {
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

debugger;
//jch! - injecting the context as the argument ends up setting those things as attributes on the model
// need to fix this.
session.model("signInModel", ["attrs", "options", session.signInModel]);
