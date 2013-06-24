
var links = module("links").use("pageComponent", "bbext");


links.component("links", function (viewFactory, appurl) {

	this.viewFactory = viewFactory;
	this.appurl = appurl;
	
}, {
	$inject: ["viewFactory", "appurl"],
	
	modelType: "linksModel",
	
	create: function () {
		this.getView().openPageSelector();
	},

	open: function () {
		var view = this.getView();
		view.render();
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
		this.renderViewMode();
	},
	
	renderViewMode: function () {
		var el = this.$el;
		this.getHtml().then(function (response) {
			el.empty().html(response);
		});
	}
});