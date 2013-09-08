
var links = module("links").use("pageComponent", "bbext");
	

links.pageComponent("links", function (viewRenderer) {

	this.viewRenderer = viewRenderer;
	this.model.on("save", this.refresh, this);
	
}, {
	$inject: ["viewRenderer"],
	
	modelType: "linksModel",
	
	create: function () {
		this.open();
	},

	open: function () {
		this.view && this.view.close();

		if (this.model.hasName()) {
			this.view = this.viewRenderer.render("linksEditView", {
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});

		} else {
			this.view = this.viewRenderer.render("linksNewView", {
				el: this.$el,
				model: this.model,
				uicid: this.uicid
			});
		}
	},

	close: function () {		
		this.view.close();
	},
	
	refresh: function () {
		this.replaceHtmlFromServer();
		this.open();
	}
});