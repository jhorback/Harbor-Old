

pageEditor.pageLink = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
	this.disableLinks();
};

pageEditor.pageLink.prototype = {

	create: function () {
		this.open();
		this.view.openPageSelector();
	},

	open: function () {
		this.view = this.viewRenderer.render("pageLinkView", {
			model: this.model,
			uicid: this.uicid
		});
		
		this.$el.empty().append(this.view.$el);
		this.disableLinks();
	},

	disableLinks: function () {
		this.$el.find("a").on("click.link", function (event) {
			event.preventDefault();
		});
	},

	close: function () {
		this.view.close({ remove: false });
		
	},
	
	remove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("pagelink", ["viewRenderer", pageEditor.pageLink]);
