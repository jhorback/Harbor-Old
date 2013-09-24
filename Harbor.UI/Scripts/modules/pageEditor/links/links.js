
pageEditor.links = function (viewRenderer) {
	
	this.viewRenderer = viewRenderer;
	//this.model.on("save", this.refresh, this);
	
};

pageEditor.links.prototype = {
	model: "linksModel",

	create: function () {
		this.open();
	},

	open: function () {
		alert("open links - needs work");
		return;
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
		alert("close links");
		return;
		this.view.close();
	}
};


pageEditor.pageComponent("links", ["viewRenderer", pageEditor.links]);
