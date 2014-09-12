

pageEditor.productLink = {
	init: function () {
		this.$el.find("a").on("click.link", function (event) {
			event.preventDefault();
		});
	},

	onCreate: function () {
		this.view.openPageSelector();
	},

	onRemove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("productlink", pageEditor.productLink);