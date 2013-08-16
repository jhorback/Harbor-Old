Session.ErrorView = Application.View.extend({
	initialize: function (options) {

		if (options.errorCode === 404) {
			this.viewID = "Session-404";
		} else if (options.errorCode === 500) {
			this.viewID = "Session-Error";
		} else {
			throw "Invalid errorCode for ErrorView";
		}
		console.log(this.model.toJSON());
		this.render();
	},

	render: function () {
		this.bindTemplate(this.viewID);
	}
});