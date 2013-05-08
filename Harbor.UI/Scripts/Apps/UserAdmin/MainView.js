UserAdmin.MainView = Application.View.extend({
	initialize: function () {
		this.collection.on("add", this.addUser, this);
		this.collection.on("destroy", this.removeUser, this);
		this.collection.on("reset", this.render, this);
	},

	events: {
		"click button[name=addUser]": function () {
			UserAdmin.addUser();
		}
	},

	render: function () {
		var $el = this.$el,
			collection = this.collection,
			self = this;

		this.JST("UserAdmin-Main").then(function (result) {
			$el.html(result);
			self.showView(new UserAdmin.ListView({
				el: self.$("#useradmin-list"),
				collection: collection
			}).render());
		});
		return this;
	},
	
	addUser: function (user) {
		UserAdmin.events.trigger("userAdded", user);
	},
	
	removeUser: function (user, collection, info) {
		var el = this.$el.find("h3").eq(info.index).parent();
		setTimeout(function () {
			el.fadeOut("slow", function () {
				el.remove();
			});
		}, 500);
	},
	
	showView: function (view) {
		this.view && this.view.close();
		this.view = view;
	},
	
	onClose: function () {
		this.view && this.view.close();
	}
});