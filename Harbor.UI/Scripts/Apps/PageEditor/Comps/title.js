
var TitleComponent = function (el, page, uicid) {
	JstViewExtension.extend(this);

	this.$el = $(el);
	this.uicid = uicid;
	this.page = page;
	this.view = null;
	this.modelbinder = null;
};

TitleComponent.prototype = {
	create: function () {
		this.template("Comps-Title", this.$el)();
		this.modelbinder = new ModelBinder(this.page, this.$el);
	},

	open: function () {
		// no editing
	},

	close: function () {
		// no editing
	},

	destroy: function () {
		this.modelbinder && this.modelbinder.unbind();
	}
};

PageEditor.registerComponent("title", TitleComponent);