
pageEditor.links = function (templateRenderer) {
	
	this.templateRenderer = templateRenderer;
	
	this.model.on("save", this.open, this);

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
			
			this.view = this.templateRenderer.render("linksNewView", {
				model: this.model,
				uicid: this.uicid
			});
		} else {
			
			this.view = this.templateRenderer.render("linksEditView", {
				model: this.model,
				uicid: this.uicid
			});
		}

		this.$el.empty().append(this.view.$el);
	},

	close: function () {
		var linksView;
		
		this.view.close();
		
		linksView = this.templateRenderer.render("linksView", {
			model: this.model,
			uicid: this.uicid
		});
		
		this.$el.empty().append(linksView.$el);
	},
	
	remove: function () {
		this.$el.find("a").unbind(".links");
	}
};


pageEditor.pageComponent("links", ["templateRenderer", pageEditor.links]);
