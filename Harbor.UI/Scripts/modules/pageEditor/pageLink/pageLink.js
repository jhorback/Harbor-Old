

pageEditor.pageLink = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
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
	}
};


pageEditor.pageComponent("pageLink", ["viewRenderer", pageEditor.pageLink]);
