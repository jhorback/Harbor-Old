

pageEditor.titleView = function (options, commandHandler) {

	this.commandHandler = commandHandler;
};

pageEditor.titleView.prototype = {
	initialize: function () {
		this.page = this.model.page;
		this.listenTo(this.page, "sync", this.pageSync);
	},

	onResolve: function () {
		this.pageEl = this.$el.closest(".page");
		this.pageHeaderEl = this.$el.closest(".page-header");
		this.overlayEl = this.pageHeaderEl.find(".page-header-overlay");
	},

	pageSync: function () {
		var attrs = this.model.attributes,
			pageClassNames = this.page.attributes.pageClassNames,
			bgUrl = attrs.enableTitleBackground ?
				"url('" + attrs.backgroundUrl + "')"  : "none";

		this.pageEl.attr("class", pageClassNames.replace("has-notitle", ""));
		this.pageHeaderEl.css({
			"background-image": bgUrl,
			"background-position-y": attrs.backgroundPosition
		});
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

/*
listen to pageClassNames - and update the .page element
listen to enable title and add/remove the bg (like below) along with the page-header class names

var overlay = $(".page-header-overlay"),
			attrs = this.model.attributes;

		/*return string.IsNullOrEmpty(Model.TitleProperties.BackgroundUrl) ?
			null : string.Format("background-image: url('{0}');background-position-y: {1};",
			Model.TitleProperties.BackgroundUrl, Model.TitleProperties.BackgroundPosition);* /
		debugger;
		if (attrs.enableTitleBackground) {

			if (overlay.length === 0) {
				overlay = $('<div class="page-header-overlay"/>').prependTo(".page-header");
			}
			overlay.show();

			$(".page-header").css("background-image", "url(\"" + attrs.backgroundUrl + "\")");
		} else {
			overlay.hide();	
			$(".page-header").css("background-image", "none");
		}*/


pageEditor.view("titleView", [
	"options",
	"commandHandler",
	pageEditor.titleView
]);
