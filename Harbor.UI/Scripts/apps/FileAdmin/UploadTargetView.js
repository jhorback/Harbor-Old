FileAdmin.UploadTargetView = Application.View.extend({
	render: function () {
		this.setupDropTarget();
	},
	
	setupDropTarget: function () {
		var el = this.$el;
		el.addClass("dropzone");
		el.dropzone({
			url: Application.url("user/upload"),
			fallback: function () {
				this.element.addClass("browser-not-supported");
				this.element.find(".message").removeClass("default");
				this.element.find(".message span").html("Your browser does not support drag'n'drop file uploads.");
			}
		});
	}
});