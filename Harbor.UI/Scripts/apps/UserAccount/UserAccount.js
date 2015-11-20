var UserAccount = {
    start: function () {
        var userApi = {} // jch! need to inject this
        var username = Session.currentUser.get("username");
        var user = userApi.getUser(username);


        user.once("sync", function () {
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
		_.bindAll(this, "editName", "editEmail", "editPayPalID", "changePassword");		
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
	
	editPayPalID: function (editable) {
		var view = new UserAccount.EditPayPalIDView({ model: this.model, editable: editable });
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
				"ua-email": this.editEmail,
				"ua-paypal": this.editPayPalID
			};
			methods[id](editable);
		}
	}
});