

pageEditor.titleView = function (options, commandHandler) {

	this.commandHandler = commandHandler;
};

pageEditor.titleView.prototype = {
	initialize: function () {
		this.enableTitleBackground = _.debounce(this.enableTitleBackground, 500);

		this.listenTo(this.model, "change:enableTitleBackground", this.enableTitleBackground);
	},

	enableTitleBackground: function () {
		this.commandHandler.execute(this.options.page, "enableTitleBackground", {
			enable: this.model.attributes.enableTitleBackground
		});
	},

	onClose: function () {
		this.$("form").remove();
	}
};



pageEditor.view("titleView", [
	"options",
	"commandHandler",
	pageEditor.titleView
]);
