

pageEditor.titleView = function (options, commandHandler, notify) {

	this.commandHandler = commandHandler;
	this.notify = notify;
};

pageEditor.titleView.prototype = {
	initialize: function () {
		this.page = this.model.page;
		this.notify.view(this).ofModel(this.page);
	},

	onResolve: function () {
		this.pageHeaderEl = this.$el.closest(".page-header");
	},

	moveUp: function () {
		this.moveBg(5);
	},

	moveDown: function () {
		this.moveBg(-5);
	},

	moveBg: function (percent) {
		var position = parseInt(this.model.attributes.backgroundPosition) + percent + "%";

		this.model.set("backgroundPosition", position);
		this.pageHeaderEl.css({
			"background-position-y": position
		});
		this.moveBackgroundImage();
	},

	moveBackgroundImage: _.debounce(function () {
		this.commandHandler.execute(this.page, "moveTitleBackground", {
			position: this.model.attributes.backgroundPosition
		});
	}, 500),

	enableTitleBackgroundClicked: _.debounce(function (event) {
		this.commandHandler.execute(this.page, "enableTitleBackground", {
			enable: this.model.attributes.enableTitleBackground
		});
	}, 10),

	hideTitlebarClicked: _.debounce(function (event) {
		this.commandHandler.execute(this.page, "hideTitlebar", {
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
	"notify",
	pageEditor.titleView
]);
