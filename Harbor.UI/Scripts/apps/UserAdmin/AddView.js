UserAdmin.AddView = UserAdmin.BaseUserView.extend({
	initialize: function () {
		_.extend(this.options, {
			templateName: "UserAdmin-Add",
			onSuccess: function () {
				UserAdmin.users.add(this.model);
			}
		});
		UserAdmin.BaseUserView.prototype.initialize.apply(this, arguments);
	}
});