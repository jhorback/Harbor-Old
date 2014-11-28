

pageEditor.title = {

	init: function () {
		this.titleBackgroundChanged = _.bind(this.titleBackgroundChanged, this);

		this.page.on("change:titleBackgroundUrl", this.titleBackgroundChanged);
	},

	titleBackgroundChanged: function () {
		var overlay = $(".page-header-overlay");

		if (this.page.attributes.titleBackgroundUrl) {

			if (overlay.length === 0) {
				overlay = $('<div class="page-header-overlay"/>').appendTo(".page-header");
			}
			overlay.show();

			$(".page-header").css("background-image", "url(\"" + this.page.attributes.titleBackgroundUrl + "\")");
		} else {
			overlay.hide();	
			$(".page-header").css("background-image", "none");
		}
	},

	onRemove: function () {
		this.page.off("change:titleBackgroundUrl", this.titleBackgroundChanged);
	}
};

pageEditor.pageComponent("title", pageEditor.title);


