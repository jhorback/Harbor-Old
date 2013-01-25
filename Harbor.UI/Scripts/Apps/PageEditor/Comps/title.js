
var TitleComponent = ContentComponent.extend({
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
		this.renderTemplate("Comps-Title")();
		this.bindModelToView();
	}
});


PageEditor.registerComponent("title", TitleComponent);