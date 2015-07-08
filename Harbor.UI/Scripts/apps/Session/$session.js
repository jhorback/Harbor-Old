/*
 *
 */
var session = context.app("session").use("appui", "bbext", "currentUserModel");

session.bootstrap = function (
	keepAlive,
	appurl,
	currentUserRepo,
	scrollHeader,
	viewRenderer
) {
	var currentUser,
		sessionNavView,
		signInPageEl,
		signInView;
	
	appurl.setBaseUrl(window.baseUrl);
	currentUser = currentUserRepo.getCurrentUser();
	keepAlive.start(appurl.get("home/keepalive"));
	scrollHeader.start();


	// render the navigation
	sessionNavView = viewRenderer.render("sessionNavView", {
		el: $("#frame-session"),
		model: currentUser
	});


	// if we are on the sign in page, render the sign in form there
	signInPageEl = $("#signinpage");
	if (signInPageEl.length > 0) {
		signInView = sessionNavView.renderSignInView();
		signInPageEl.append(signInView.$el);
	}


	// window.Session is deprecated it is only in use by the old style BackBone apps.
	window.Session = {
		currentUser: currentUser,
		url: function (url) {
			return window.baseUrl + (url || "");
		}
	};
};


session.start([
	"keepAlive",
	"appurl",
	"currentUserRepo",
	"pageAdder",
	"scrollHeader",
	"viewRenderer",
	session.bootstrap
]);