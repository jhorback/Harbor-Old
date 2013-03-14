var UserAccount = {
	start: function () {
		var username = Session.currentUser.get("username");
		var user = new UserModel({ userName: username });
		
		user.fetch().then(function () {
			var mainView = new UserAccount.MainView({
				el: $(".page"),
				model: user
			});
			mainView.render();
		});
	}
};

UserAccount.MainView = Application.View.extend({
	initialize: function () {
		_.bindAll(this, "editName", "editEmail", "changePassword");		
	},

	render: function () {
		this.$(".page-content").show();
		this.bindModelToView();
	},

	editName: function (editable) {
	    var view = new UserAccount.EditNameView({ model: this.model, editable: editable });
	    view.render();
	},

	editEmail: function (editable) {
		var view = new UserAccount.EditEmailView({ model: this.model, editable: editable });
		view.render();
	},

	changePassword: function () {
		var view = new UserAccount.ChangePasswordView({ model: this.model });
		view.render();
	},
	
	events: {
		"click [name=changePassword]": function () {
			this.changePassword();
		},

		"click .link": function (event) {
			var editable = $(event.target).closest("dd");
			var id = editable.attr("id");
			var methods = {
				"ua-name": this.editName,
				"ua-email": this.editEmail
			};
			methods[id](editable);
		}
	}
});