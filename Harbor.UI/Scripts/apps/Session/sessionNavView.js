
session.sessionNavView = function (options, currentUserRepo) {

	this.currentUserRepo = currentUserRepo;
};

session.sessionNavView.prototype = {
	initialize: function () {
		this.currentUser = this.currentUserRepo.getCurrentUser();
		
	},

	events: {
		"click #signin-link": function (event) {
			event.preventDefault();
			//$.ajax("/Home/ThrowError");
			this.showSignInDialog();
		},

		"click #profile-link": function (event) {
			event.preventDefault();
			this.showView(new Session.UserMenu());
		}
	},
	

	showSignInDialog: function () {
		var signInView = new Session.SignInView({
			model: new Session.SignInModel()
		});
		signInView.render();
		var dialog = new Dialog(signInView.$el, {
			title: "Sign in",
			modal: true,
			transition: "fade"
		});
	},
	
	showView: function (view) {
		this.view && this.view.close();
		this.view = view;
	},

	onClose: function () {
		this.view && this.view.close();
	}
};


session.view("sessionNavView", [
	"options",
	"currentUserRepo",
	session.sessionNavView
]);
