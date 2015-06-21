
pageLoader.pageLoaderModel = {
	defaults: {},

	associations: {
		"tabs": {
			type: "collection",
			model: "pageLoaderTab",
			initialize: function () {
				this.set(this.root.tabModels);
			}
		}
	},

	tabModels: [{
		id: "view",
		text: "View",
		selected: true
	}, {
		id: "edit",
		text: "Edit",
	}, {
		id: "settings",
		text: "Settings",
	}]
};

pageLoader.model("pageLoaderModel", pageLoader.pageLoaderModel);