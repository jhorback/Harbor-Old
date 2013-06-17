
var links = module("links").use("pageComponent", "bbext");


links.component("links", function () {

}, {
	modelType: "linksModel",
	
	create: function () {
		this.getView().openPageSelector();
	},

	open: function () {
		debugger;
		this.getView().render();
	},

	getView: function () {
		this.view && this.view.close();
		if (this.model.hasName()) {
			this.view = new LinksComponent.EditView({
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});
		} else {
			this.view = new LinksComponent.NewView({
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

var LinksComponent = {};

//var LinksComponent = PageComponent.extend({

//	modelType: function () {
//		return LinksComponent.Model;
//	},

//	initialize: function () {
		
//	},

//	create: function () {
//		this.open();
//		this.getView().openPageSelector();
//	},

//	open: function () {
//		this.getView().render();
//	},

//	getView: function () {
//		this.view && this.view.close();
//		if (this.model.hasName()) {
//			this.view = new LinksComponent.EditView({
//				el: this.$el,
//				model: this.model,
//				uicid: this.uicid
//			});
//		} else {
//			this.view = new LinksComponent.NewView({
//				el: this.$el,
//				model: this.model,
//				uicid: this.uicid
//			});
//		}
//		return this.view;
//	},

//	close: function () {
//		this.view.close();
//	}
//});

//PageEditor.registerComponent("links", LinksComponent);
