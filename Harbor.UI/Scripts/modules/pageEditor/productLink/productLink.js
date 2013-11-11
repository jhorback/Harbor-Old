

pageEditor.productLink = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
	
	this.$el.find("a").on("click.link", function (event) {
		event.preventDefault();
	});
};

pageEditor.productLink.prototype = {
	model: "productLinkModel",

	create: function () {
		this.open();
		this.view.openPageSelector();
	},

	open: function () {
		this.view = this.viewRenderer.render("productLinkView", {
			model: this.model,
			uicid: this.uicid
		});
		
		this.$el.empty().append(this.view.$el);
	},

	close: function () {
		this.view.close({ remove: false });
	},
	
	remove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("productLink", ["viewRenderer", pageEditor.productLink]);
