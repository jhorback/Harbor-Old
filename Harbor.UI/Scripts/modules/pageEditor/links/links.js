
pageEditor.links = function (viewRenderer) {
	
	this.viewRenderer = viewRenderer;
	//this.model.on("save", this.refresh, this);
	
	this.$el.find("a").on("click.links", function (event) {
		event.preventDefault();
	});
};

pageEditor.links.prototype = {
	model: "linksModel",

	create: function () {
		this.open();
	},

	open: function () {
		this.view && this.view.close();
		
		if (this.model.isNew()) {
			
			this.view = this.viewRenderer.render("linksNewView", {
				model: this.model,
				uicid: this.uicid
			});
		} else {
			
			this.view = this.viewRenderer.render("linksEditView", {
				model: this.model,
				uicid: this.uicid
			});
		}

		this.$el.empty().append(this.view.$el);
	},

	close: function () {

		this.view.close();
	},
	
	remove: function () {
		this.$el.find("a").unbind(".links");
	}
};


pageEditor.pageComponent("links", ["viewRenderer", pageEditor.links]);
