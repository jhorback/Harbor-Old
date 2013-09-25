

pageEditor.image = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
};

pageEditor.image.prototype = {
	model: "imageModel",
	
	create: function () {
		this.open();
		this.view.openFileSelector();
	},

	open: function () {
		console.log("open image - needs work");
		return;
		this.view = this.viewRenderer.render("imageEditView", {
			el: this.$el,
			model: this.model,
			uicid: this.uicid
		});
	},

	close: function () {
		console.log("close image");
		return;
		this.view.close();
	}
};


pageEditor.pageComponent("image", ["viewRenderer", pageEditor.image]);