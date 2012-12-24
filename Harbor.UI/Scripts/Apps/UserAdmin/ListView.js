UserAdmin.ListView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, "renderUser");
		
		this.listenTo(UserAdmin.events, "userAdded", this.renderUser);
	},

	events: {
		"click a": function (event) {
			UserAdmin.handleLinkClick(event);
		}
	},

	render: function () {
		this.collection.each(this.renderUser);
		return this;
	},

	renderUser: function (user) {
		var userView = new UserAdmin.UserListItemView({
			model: user
		});
		userView.render();
		this.$el.append(userView.el);
	}
});