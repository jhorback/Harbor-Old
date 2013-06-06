
var TitleComponent = PageComponent.extend({
	create: function () {
		this.open();
	},

	open: function () {
		this.view = new TitleComponent.View({
			model: this.page,
			$el: this.$el
		});
		this.view.render();
	},

	close: function () {
		this.view.close();
	}
});


TitleComponent.View = Application.View.extend({
	render: function () {
		this.bindTemplate("Comps-Title");
	}
});


PageEditor.registerComponent("title", TitleComponent);