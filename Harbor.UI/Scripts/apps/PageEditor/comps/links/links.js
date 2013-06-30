
var links = module("links").use("pageComponent", "bbext");
	

links.component("links", function (viewFactory) {

	this.viewFactory = viewFactory;
	this.model.on("save", this.refresh, this);
	
}, {
	$inject: ["viewFactory"],
	
	modelType: "linksModel",
	
	create: function () {
		this.getView().render();
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
	},
	
	refresh: function () {
		this.replaceHtmlFromServer();
		this.open();
	}
});