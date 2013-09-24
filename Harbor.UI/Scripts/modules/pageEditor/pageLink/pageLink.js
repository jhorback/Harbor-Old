

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
		alert("open pageLink - needs work");
		return;
		this.view = this.viewRenderer.render("imageEditView", {
			el: this.$el,
			model: this.model,
			uicid: this.uicid
		});
	},

	close: function () {
		alert("close pageLink");
		return;
		this.view.close();
	}
};


pageEditor.pageComponent("pageLink", ["viewRenderer", pageEditor.pageLink]);
