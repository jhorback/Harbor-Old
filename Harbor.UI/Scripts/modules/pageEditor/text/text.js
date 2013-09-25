

pageEditor.text = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
};

pageEditor.text.prototype = {
	model: "textModel",
	
	create: function () {
		this.open();
	},

	open: function () {
		console.log("open text");
		return;
		this.view = this.viewRenderer.render("textView", {
			el: this.$el,
			model: this.model
		});
	},

	close: function () {
		console.log("close text");
		return;
		this.view.close();
	}
};


pageEditor.pageComponent("text", ["viewRenderer", pageEditor.text]);