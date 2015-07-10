
session.sessionNavView = function (
	options,
	currentUserRepo,
	templateRenderer,
	dialogFactory
) {

	this.currentUserRepo = currentUserRepo;
	this.templateRenderer = templateRenderer;
	this.dialogFactory = dialogFactory;
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
		var signInView;

		event && event.preventDefault();

		signInView = this.renderSignInView();
		this.dialogFactory.create(signInView.$el, {
			title: "Sign in"
			// transition: "fade" - instead of transion - pass anchor:el - to the dialog
			// -> the dialog can make the transition
		});
	},

	renderSignInView: function () {
		return this.templateRenderer.render("signInView",  {
			currentUser: this.model
		});
	}
};


session.view("sessionNavView", [
	"options",
	"currentUserRepo",
	"templateRenderer",
	"dialogFactory",
	session.sessionNavView
]);
