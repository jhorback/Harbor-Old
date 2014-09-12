

pageEditor.pageLink = {
	init: function () {
		this.disableLinks();
	},

	onCreate: function () {
		this.view.openPageSelector();
	},

	onOpen: function () {
		this.disableLinks();
	},

	disableLinks: function () {
		this.$el.find("a").on("click.link", function (event) {
			event.preventDefault();
		});
	},

	onRemove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("pagelink", pageEditor.pageLink);
