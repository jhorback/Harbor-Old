
var TitleComponent = function (options) {
	JstViewExtension.extend(this);

	this.$el = options.$el;
	this.uicid = options.uicid;
	this.page = options.page;
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