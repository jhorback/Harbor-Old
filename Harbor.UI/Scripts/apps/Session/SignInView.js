
session.signInView = function (options, ajaxRequest, appurl) {

	this.ajaxRequest = ajaxRequest;
	this.appurl = appurl;
};

session.signInView.prototype = {
	
	initialize: function () {
		// this.bindAll("showError", "clear")
		//model: new Session.SignInModel() - create the model here.
		this.model = this.modelFactory.create("signInModel");

		if (this.options.currentUser.get("isAuthenticated") &&
			window.location.toString().toLowerCase().indexOf("returnurl") > -1) {
			this.showError("Permission Denied", "You do not have permission to view the requested page.");
		}
	},

	submitForm: function (event) {
		event.preventDefault();
		if (!this.isModelValid()) {
			return;
		}
		this.signIn();
	},
	
	signIn: function () {
		var signInRequest = $.ajax({
			url: this.appurl.get("user/signin"),
			data: this.model.toJSON(),
			type: "POST"
		});

		this.ajaxRequest.handle(signInRequest, {
			clientError: function (error) {
				this.showError("Sign in failed", error);
			},
			success: function () {
				this.clearErrors();
				this.onLoginSuccess();
			}
		}, this);
	},

	onLoginSuccess: function () {
		var returnUrl = this.getUrlParam("returnUrl");
		if (returnUrl) {
			window.location = returnUrl;
		} else {
			if (window.location.toString().toLowerCase().indexOf("user/signin") > -1) {
				window.location = this.appurl.get();
			} else {
				try {

					if (window.location.pathname.toLowerCase().indexOf("/signin") > -1) {
						window.location = "/";
					} else {
						window.location.reload();
					}
				} catch (e) {
					window.location = "/";
				}
			}
		}
	},

	getUrlParam: function (name) { // jch! - only used here
		/// <summary>Returns a parameter from the querystring (or null if not found).</summary>
		var regex, results;
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "i");
		results = regex.exec(window.location.search);
		if (results == null) {
			return null;
		}
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	},
	
	showError: function (error, message) {
		var errors = modelErrors.create();
		errors.add(error);
		errors.add(message);
		this.displayErrors(errors.toJSON());
	}
};

session.view("signInView", [
	"options",
	"ajaxRequest",
	"appurl",
	session.signInView
]);
