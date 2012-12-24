
// jch* - simple for now - could have a view associated with this if needed later
var LinksComponent = function (el, page, uicid) {
	JstViewExtension.extend(this);

	this.$el = $(el);
	this.uicid = uicid;
	this.page = page;
	this.view = null;
};

LinksComponent.prototype = {
	create: function () {
		this.template("Comps-Links", this.$el)();
	},

	getView: function () {
//		if (!this.view) {
//			this.view = new PageEditor.TextView({
//				uicid: this.uicid,
//				model: this.page,
//				$el: this.$el
//			});
//		}
//		return this.view;
	},

	open: function () {
		console.log("links is open for edit: ", this.uicid);
	},

	close: function () {
		console.log("links is closed for edit: ", this.uicid);
	},

	destroy: function () {
		// this.view.dispose();
		console.log("destroy links");
	}
};

PageEditor.registerComponent("links", LinksComponent);