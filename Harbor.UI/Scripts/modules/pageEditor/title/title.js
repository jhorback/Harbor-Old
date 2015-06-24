

pageEditor.title = {

	init: function () {
		this.pageEl = this.$el.closest(".page");
		this.pageHeaderEl = this.$el.closest(".page-header");
		this.overlayEl = this.pageHeaderEl.find(".page-header-overlay");
		this.pageSync = _.bind(this.pageSync, this);
		this.page.on("sync", this.pageSync);
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

	onRemove: function () {
		this.page.off("sync", this.pageSync);
	}
};

pageEditor.pageComponent("title", pageEditor.title);


