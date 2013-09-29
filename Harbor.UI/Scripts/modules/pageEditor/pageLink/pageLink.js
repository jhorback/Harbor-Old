

pageEditor.pageLink = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
	
	this.$el.on("click.link", function (event) {
		event.preventDefault();
	});
};

pageEditor.pageLink.prototype = {
	model: "imageModel",

	create: function () {
		debugger;
		this.open();
		this.view.openPageSelector();
	},

	open: function () {
		debugger;
		
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
		this.$el.unbind(".link");
	}
};


pageEditor.pageComponent("pageLink", ["viewRenderer", pageEditor.pageLink]);
