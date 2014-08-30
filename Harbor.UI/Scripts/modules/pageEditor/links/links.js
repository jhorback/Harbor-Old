
pageEditor.links = function (templateRenderer) {
	
	this.templateRenderer = templateRenderer;
	
	// this.model.on("save", this.open, this);

	this.$el.find("a").on("click.links", function (event) {
		event.preventDefault();
	});
};

pageEditor.links.prototype = {

	create: function () {
		this.open();
	},

	open: function () {

		this.view && this.view.close();
		
		this.view = this.templateRenderer.render("linksEditView", {
			model: this.model,
			uicid: this.uicid
		});

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

/*

Have the component define the create, open, and close mthods?!
The component can define callbacks for:
	onInit:
	onCreate
	onOpen
	onClose
	onRemove

All are optional 
*/


pageEditor.pageComponent("links", ["templateRenderer", pageEditor.links]);
