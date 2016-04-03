
session.sessionNavView = function (
	options,
	currentUserRepo,
	viewRenderer,
	dialogFactory
) {

	this.currentUserRepo = currentUserRepo;
	this.viewRenderer = viewRenderer;
	this.dialogFactory = dialogFactory;
};

session.sessionNavView.prototype = {
	initialize: function () {
		this.model = this.currentUserRepo.getCurrentUser();
		if (this.model.attributes.isAuthenticated) {
			this.appMenuModel = this.modelFactory.create("appMenuModel");
		}
	},

	showMainMenu: function (event) {
		event && event.preventDefault();
		this.viewRenderer.render("appMenuView", {
			model: this.appMenuModel
		});
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
	    return this.viewRenderer.render("signInView", {
			currentUser: this.model
		});
	}
};


session.view("sessionNavView", [
	"options",
	"currentUserRepo",
	"viewRenderer",
	"dialogFactory",
	session.sessionNavView
]);
