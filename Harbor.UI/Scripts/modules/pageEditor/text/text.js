

pageEditor.text = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
	
	this.$el.on("click.text", function (event) {
		event.preventDefault();
	});
};

pageEditor.text.prototype = {
	
	create: function () {
		this.open();
	},

	open: function () {
		this.view = this.viewRenderer.render("textView", {
			model: this.model
		});
		this.$el.empty().html(this.view.$el);
	},

	close: function () {
		 this.view.close({ remove: false });
	},
	
	remove: function () {
		this.$el.unbind(".text");
	}
};


pageEditor.pageComponent("text", ["viewRenderer", pageEditor.text]);