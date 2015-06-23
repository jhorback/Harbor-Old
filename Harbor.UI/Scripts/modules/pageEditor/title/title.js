

pageEditor.title = {

	init: function () {
		this.titleBackgroundChanged = _.bind(this.titleBackgroundChanged, this);
		this.model.on("change:enableTitleBackground", this.titleBackgroundChanged);
	},

	titleBackgroundChanged: function () {
		
	},

	onRemove: function () {
		this.model.off("change:enableTitleBackground", this.titleBackgroundChanged);
	}
};

pageEditor.pageComponent("title", pageEditor.title);


