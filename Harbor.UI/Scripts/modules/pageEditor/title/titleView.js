

pageEditor.titleView = function (options, commandHandler) {

	this.commandHandler = commandHandler;
};

pageEditor.titleView.prototype = {
	enableTitleBackground: _.debounce(function() {
		this.commandHandler.execute(this.options.page, "enableTitleBackground", {
			enable: this.model.attributes.enableTitleBackground
		});
	}, 10),

	hideTitlebar: _.debounce(function() {
		this.commandHandler.execute(this.options.page, "hideTitlebar", {
			hide: this.model.attributes.hideTitlebar
		});
	}, 10),

	onClose: function() {
		this.$("form").remove();
	}
};



pageEditor.view("titleView", [
	"options",
	"commandHandler",
	pageEditor.titleView
]);
