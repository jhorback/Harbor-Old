

pageEditor.text = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
};

pageEditor.text.prototype = {
	model: "textModel",
	
	create: function () {
		this.open();
	},

	open: function () {
		var text = this.model.get("text") || "some text here";
		this.$el.html(text);
		//this.view = this.viewRenderer.render("textView", {
		//	el: this.$el,
		//	model: this.model
		//});
	},

	close: function () {
		// this.view.close();
	}
};


pageEditor.pageComponent("text", ["viewRenderer", pageEditor.text]);