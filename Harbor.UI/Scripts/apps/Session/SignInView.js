session.signInView = function () {

};

session.signInView.prototype = {
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
		
		if (!this.isModelValid()) {
			return;
		}

		this.requestSignIn(this.model.toJSON(), {
			clientError: function (error) {
				showError("Sign in failed", error);
			},
			success: function () {
				clearErrors();
			}
		});
	},

	requestSignIn: function (signInModel, handler, handlerProxy) {
		/// <summary>Executes the sign in ajax request.</summary>
		var request = AjaxRequest.handle($.ajax({
			url: Session.url("User/SignIn"),
			data: signInModel,
			type: "POST"
		}), handler);
			
		request.then(function () {
			var returnUrl = this.getUrlParam("returnUrl");
			if (returnUrl) {
				window.location = returnUrl;
			} else {
				if (window.location.toString().toLowerCase().indexOf("user/signin") > -1) {
					window.location = Session.url();
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
		});

		return request;
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
		var displayErrors = _.bind(this.displayErrors, this);

		setTimeout(function () {
			context.app("session").call(["modelErrors", function (modelErrors) {
				var errors = modelErrors.create();
				errors.add(error);
				errors.add(message);
				displayErrors(errors.toJSON());
			}]);
		}, 1);
	}
};

session.view("signInView", [
	"options",
	session.signInView
]);
