

pageEditor.image = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
};

pageEditor.image.prototype = {
	create: function () {
		this.open();
		this.view.openFileSelector();
	},

	open: function () {
		this.view = this.viewRenderer.render("imageEditView", {
			model: this.model,
			uicid: this.uicid
		});
		
		this.$el.empty().append(this.view.$el);
	},

	close: function () {
		this.view.close({ remove: false });
	}
};


pageEditor.pageComponent("image", ["viewRenderer", pageEditor.image]);