
session.sessionNavView = function (
	options,
	currentUserRepo,
	templateRenderer
) {

	this.currentUserRepo = currentUserRepo;
	this.templateRenderer = templateRenderer;
};

session.sessionNavView.prototype = {
	initialize: function () {

		this.model = this.currentUserRepo.getCurrentUser();
	},

	showMainMenu: function (event) {
		event && event.preventDefault();

		this.templateRenderer.render("appMenuView");
	},

	
	showSignInDialog: function (event) {
		event && event.preventDefault();

		var dialog = new Dialog(signInView.$el, {
			title: "Sign in",
			modal: true,
			transition: "fade"
		});
	},

	renderSignInView: function () {
		return this.templateRenderer.render("signInView");
	}
};


session.view("sessionNavView", [
	"options",
	"currentUserRepo",
	"templateRenderer",
	session.sessionNavView
]);
