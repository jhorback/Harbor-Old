UserAdmin.EditView = UserAdmin.BaseUserView.extend({
	initialize: function () {
		_.extend(this.options, {
			templateName: "UserAdmin-Edit",
			events: {
				"click #useradmin-delete": function () {
					this.deleteUser();
				}
			}
		});
		UserAdmin.BaseUserView.prototype.initialize.apply(this, arguments);
	},
	
	deleteUser: function () {
		var answer = confirm("Are you sure you want to delete this user and all associated data?");
		if (!answer) {
			return;
		}
		UserAdmin.main();
		this.model.destroy();
	}
});