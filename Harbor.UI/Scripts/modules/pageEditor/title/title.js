

pageEditor.title = {

	init: function () {
		this.titleBackgroundChanged = _.bind(this.titleBackgroundChanged, this);
		this.model.on("change:enableTitleBackground", this.titleBackgroundChanged);
	},

	titleBackgroundChanged: function () {
		var overlay = $(".page-header-overlay"),
			attrs = this.model.attributes;

		if (attrs.enableTitleBackground) {

			if (overlay.length === 0) {
				overlay = $('<div class="page-header-overlay"/>').prependTo(".page-header");
			}
			overlay.show();

			$(".page-header").css("background-image", "url(\"" + attrs.backgroundUrl + "\")");
		} else {
			overlay.hide();	
			$(".page-header").css("background-image", "none");
		}
	},

	onRemove: function () {
		this.model.off("change:enableTitleBackground", this.titleBackgroundChanged);
	}
};

pageEditor.pageComponent("title", pageEditor.title);


