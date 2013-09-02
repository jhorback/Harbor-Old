﻿(function () {
	
	
	

	var Session = {
		
		currentUser: null,

		url: function (url) {
			/// <summary>Adds the base url to the url (including the '/'). Session.url() will go home.</summary>
			return window.baseUrl + (url || "");
		},

		getUrlParam: function (name) {
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

		start: function () {
			session.start();
			var nav = new Session.SessionNav({
				el: $("#frame-session")
			});
		},

		startSignIn: function () {

			Session.start({
				showSignInLink: false
			});

			$("#frame-session").hide();

			var signInView = new Session.SignInView({
				el: $("#signinpage"),
				model: new Session.SignInModel()
			});
			signInView.render();
		},

		signIn: function (signInModel, handler, handlerProxy) {
			/// <summary>Executes the sign in ajax request.</summary>
			var request = AjaxRequest.handle($.ajax({
				url: Session.url("User/SignIn"),
				data: signInModel,
				type: "POST"
			}), handler);
			
			request.then(function () {
				var returnUrl = Session.getUrlParam("returnUrl");
				if (returnUrl) {
					window.location = returnUrl;
				} else {
					if (window.location.toString().toLowerCase().indexOf("user/signin") > -1) {
						window.location = Session.url();
					} else {
						window.location.reload();
					}
				}
			});

			return request;
		},

		signOut: function (handler) {
			/// <summary>Executes the sign out ajax request.</summary>
			return AjaxRequest.handle($.ajax({
				url: Session.url("User/SignOut")
			}), handler);
		}
	};

	_.extend(Session, Backbone.Events);


	window.Session = Session;


	var session = context.app("session").
		register("baseUrl", window.baseUrl);

	session.use("appui", "bbext", "currentUserModel");
	session.start(["keepAlive", "appurl", "currentUserRepo", function (keepAlive, appurl, currentUserRepo) {
		keepAlive.start(appurl.get("home/keepalive"));
		Session.currentUser = currentUserRepo.getCurrentUser();
	}]);
} ());

