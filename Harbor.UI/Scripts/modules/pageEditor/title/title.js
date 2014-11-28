

pageEditor.title = {

	init: function () {
		this.titleBackgroundChanged = _.bind(this.titleBackgroundChanged, this);

		this.page.on("change:titleBackgroundUrl", this.titleBackgroundChanged);
	},

	titleBackgroundChanged: function () {
		
		// jch! - also make sure to add/remove the overlay

		if (this.page.attributes.titleBackgroundUrl) {
			$(".page-header").css("background-image", "url(\"" + this.page.attributes.titleBackgroundUrl + "\")");
		} else {
			$(".page-header").css("background-image", "none");
		}
	},

	onRemove: function () {
		this.page.off("change:titleBackgroundUrl", this.titleBackgroundChanged);
	}
};

pageEditor.pageComponent("title", pageEditor.title);


