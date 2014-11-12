
fileAdmin.uploadTargetView = function (options, appurl, modelFactory) {
	this.uploadUrl = appurl.get("file/upload");
	this.modelFactory = modelFactory;
};


fileAdmin.uploadTargetView.prototype = {
	onRender: function () {
		this.setupDropTarget();
	},
	
	setupDropTarget: function () {
		var el = this.$el,
			albums = this.model.albums,
			modelFactory = this.modelFactory;

		el.addClass("dropzone");
		el.dropzone({
			url: this.uploadUrl,
			fallback: function () {
				this.element.addClass("browser-not-supported");
				this.element.find(".message").removeClass("default");
				this.element.find(".message span").html("Your browser does not support drag'n'drop file uploads.");
			},
			success: function (uploadedFile, response) {
				var file = modelFactory.create("file", response);
				uploadedFile.previewElement.classList.add("dz-success");
				albums.groupSource.add(file);
			}
		});
	}
};


fileAdmin.view("uploadTargetView", [
	"options", "appurl", "modelFactory",
	fileAdmin.uploadTargetView]);