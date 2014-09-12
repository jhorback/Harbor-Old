
pageEditor.links = {
	init: function () {
		this.$el.find("a").on("click.links", function (event) {
			event.preventDefault();
		});
	},
	
	onRemove: function () {
		this.$el.find("a").unbind(".links");
	}
};

pageEditor.pageComponent("links", pageEditor.links);
