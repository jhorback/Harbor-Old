
links.view("linksEditView", {
	render: function () {
		this.$el.css("font-weight", "bold");
	},
	
	onClose: function () {
		this.$el.css("font-weight", "normal");
	}
});