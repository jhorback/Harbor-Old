

pageEditor.text = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
};

pageEditor.text.prototype = {
	model: "textModel",
	
	create: function () {
		this.open();
	},

	open: function () {
		this.view = viewRenderer.create("textView", {
			el: this.$el,
			model: this.model
		});
	},

	close: function () {
		this.view.close();
	}
};


pageEditor.pageComponent("text", ["viewRenderer", pageEditor.text]);