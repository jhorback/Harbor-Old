UserAdmin.Users = Backbone.Collection.extend({
	url: Session.url("api/users"),
	model: UserModel
});

UserAdmin.Role = Backbone.Model.extend({
	defaults: {
		key: null,
		name: null,
		description: null,
		disabled: ""
	}
});

UserAdmin.UserRoles = Backbone.Collection.extend({
	url: Session.url("api/userroles"),
	model: UserAdmin.Role,
	toString: function () {
		return this.get("name");
	}
});