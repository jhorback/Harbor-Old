/*
 *
 */
var session = context.app("session").use("appui", "bbext", "currentUserModel");

session.bootstrap = function (keepAlive,
	appurl,
	currentUserRepo,
	scrollHeader,
	viewRenderer,
	appMenuDto
) {
	var currentUser;
	
	appurl.setBaseUrl(window.baseUrl);
	currentUser = currentUserRepo.getCurrentUser();
	keepAlive.start(appurl.get("home/keepalive"));
	scrollHeader.start();

	viewRenderer.render("sessionNavView", {
		el: $("#frame-session"),
		model: currentUser
	});


	// jch* - need to check for #signinpage - then start that up if needed
	/*
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
	}*/

	// can create the appMenu now - appMenuDto

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
	"appMenuDto",
	session.bootstrap
]);