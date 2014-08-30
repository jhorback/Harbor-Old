

pageEditor.pageLink = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
	
	this.$el.find("a").on("click.link", function (event) {
		event.preventDefault();
	});
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
	},

	close: function () {
		this.view.close({ remove: false });
	},
	
	remove: function () {
		this.$el.find("a").unbind(".link");
	}
};


pageEditor.pageComponent("pageLink", ["viewRenderer", pageEditor.pageLink]);
