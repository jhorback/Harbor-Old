UserAdmin.UserListItemView = Backbone.View.extend({
	initialize: function () {
		Session.ViewExtension.extend(this);
		
	},

	render: function () {
		var $el = this.$el,
			model = this.model;

		this.JST("UserAdmin-ListItem", this.model).then(function (result) {
			$el.html(result);
			Session.ModelBinder(model, $el);
			if (!model.get("lastActivity")) {
				$el.find("#useradmin-lastActivity").hide();
			}
		});
	}
});