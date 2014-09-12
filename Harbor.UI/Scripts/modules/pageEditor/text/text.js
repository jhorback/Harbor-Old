


pageEditor.text = {
	init: function () {
		this.$el.on("click.text", function (event) {
			event.preventDefault();
		});
	},

	onRemove: function () {
		this.$el.unbind(".text");
	}
};


pageEditor.pageComponent("text", pageEditor.text);