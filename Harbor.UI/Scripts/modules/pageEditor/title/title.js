﻿
pageEditor.title = function (viewRenderer) {
	this.viewRenderer = viewRenderer;
};

pageEditor.title.prototype = {
	create: function () {
		this.open();
	},

	open: function () {
		this.view = this.viewRenderer.render("titleView", {
			model: this.page,
			$el: this.$el
		});
	},

	close: function () {
		this.view.close();
	}
};


pageEditor.pageComponent("title", ["viewRenderer", pageEditor.title]);