Session.ErrorView = Backbone.View.extend({
	initialize: function (options) {
		Session.ViewExtension.extend(this);

		if (options.errorCode === 404) {
			this.viewID = "Session-404";
		} else if (options.errorCode === 500) {
			this.viewID = "Session-Error";
		} else {
			throw "Invalid errorCode for ErrorView";
		}
		this.render();
	},

	render: function () {
		var $el = this.$el,
			model = this.model;

		this.JST(this.viewID).then(function (response) {
			$el.html(response);
			Session.ModelBinder(model, $el);
		});
	}
});