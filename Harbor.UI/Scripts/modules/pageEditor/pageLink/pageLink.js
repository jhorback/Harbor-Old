

pageEditor.pageLink = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
	
	this.$el.on("click.link", function (event) {
		event.preventDefault();
	});
};

pageEditor.pageLink.prototype = {
	model: "imageModel",

	create: function () {
		this.open();
		this.view.openPageSelector();
	},

	open: function () {
		
		console.log("open pageLink");
		return;
		this.view = this.viewRenderer.render("imageEditView", {
			el: this.$el,
			model: this.model,
			uicid: this.uicid
		});
	},

	close: function () {
		
		console.log("close pageLink");
		return;
		this.view.close();
	},
	
	remove: function () {
		this.$el.unbind(".link");
	}
};


pageEditor.pageComponent("pageLink", ["viewRenderer", pageEditor.pageLink]);
