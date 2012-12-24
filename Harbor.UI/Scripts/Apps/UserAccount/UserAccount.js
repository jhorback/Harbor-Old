var UserAccount = {
	start: function () {
		var username = Session.currentUser.get("username");
		var user = new UserModel({ userName: username });
		user.fetch().then(function () {
			var mainView = new UserAccount.MainView({
				el: $(".page-content"),
				model: user
			});
		});
	},
	
	dialogRegion: new Region()
};

UserAccount.MainView = Backbone.View.extend({
	initialize: function () {
		DisposeViewExtension.extend(this);
		_.bindAll(this, "editName", "editEmail", "changePassword");
		this.render();
	},

	render: function () {
		this.track(new ModelBinder(this.model, this.$el.show()));
	},

	editName: function (editable) {
		UserAccount.dialogRegion.show(new UserAccount.EditNameView({model: this.model, editable: editable}));
	},

	editEmail: function (editable) {
		UserAccount.dialogRegion.show(new UserAccount.EditEmailView({ model: this.model, editable: editable }));
	},

	changePassword: function () {
		UserAccount.dialogRegion.show(new UserAccount.ChangePasswordView({ model: this.model }));
	},
	
	events: {
		"click [name=changePassword]": function () {
			this.changePassword();
		},

		"click .editable": function (event) {
			var editable = $(event.target).closest(".editable");
			var id = editable.attr("id");
			var methods = {
				"ua-name": this.editName,
				"ua-email": this.editEmail
			};
			methods[id](editable);
		}
	}
});