UserAdmin.UserListItemView = Application.View.extend({
	render: function () {
		this.bindTemplate("UserAdmin-ListItem");
		if (!this.model.get("lastActivity")) {
			this.$el.find("#useradmin-lastActivity").hide();
		}
	}
});