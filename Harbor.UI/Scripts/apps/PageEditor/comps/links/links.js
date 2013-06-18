
var links = module("links").use("pageComponent", "bbext");


links.component("links", function (viewFactory) {

	this.viewFactory = viewFactory;
	
}, {
	$inject: ["viewFactory"],
	
	modelType: "linksModel",
	
	create: function () {
		this.getView().openPageSelector();
	},

	open: function () {
		this.getView().render();
	},

	getView: function () {
		this.view && this.view.close();
		if (this.model.hasName()) {
			this.view = this.viewFactory.create("linksEditView", {
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});
		} else {
			this.view = this.viewFactory.create("linksNewView", {
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});
		}
		return this.view;
	},

	close: function () {
		this.view.close();
	}
});