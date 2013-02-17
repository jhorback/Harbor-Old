Session.SessionNav = Backbone.View.extend({

	initialize: function () {
		var cu = Session.currentUser;
		Session.ViewExtension.extend(this);

		if (cu.get("isAuthenticated") === true) {
			this.render();

		} else if (cu.get("showSignInLink") === true) {
			this.renderSignInLink();
		}
	},

	events: {
		"click #signin-link": function (event) {
			event.preventDefault();
			//$.ajax("/Home/ThrowError");
			this.showSignInDialog();
		},

		"click #profile-link": function (event) {
			event.preventDefault();
			this.views("userMenu", new Session.UserMenu());
		}
	},

	renderSignInLink: function () {
		var link = $('<a id="signin-link" href="' + Session.url("User/SignIn") + '">Sign in</a>');
		link.hide();
		this.$el.html("").append(link);
		link.fadeIn("slow");
	},

	render: function () {
		var displayName = Session.currentUser.get("usersDisplayName");
		var link = $('<a id="profile-link" href="' + Session.url("User/Account") + '">' + displayName + '</a>');
		link.hide();
		this.$el.html("").append(link);
		link.fadeIn("slow");
		return this;
	},

	showSignInDialog: function () {
		var signInView = new Session.SignInView();
		var dialog = new Session.Dialog(signInView.$el, {
			title: "Sign in",
			modal: true,
			transition: "fade"
		});
	}
});