
pageEditor.links = function (viewRenderer) {
	
	this.viewRenderer = viewRenderer;
	//this.model.on("save", this.refresh, this);
	
	this.$el.on("click.links", function (event) {
		event.preventDefault();
	});
};

pageEditor.links.prototype = {
	model: "linksModel",

	create: function () {
		this.open();
	},

	open: function () {
		console.log("open links - needs work");
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
		console.log("close links");
		return;
		this.view.close();
	},
	
	remove: function () {
		this.$el.unbind(".links");
	}
};


pageEditor.pageComponent("links", ["viewRenderer", pageEditor.links]);
