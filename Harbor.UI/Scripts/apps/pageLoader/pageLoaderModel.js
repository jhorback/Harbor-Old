
var pageLoaderModel = {
	defaults: {
		mode: "view",
		doneButtonVisible: false
	},

	doneButtonVisible: {
		get: function (value) {
			if (this.get("mode") === "view") {
				return false;
			}
			return true;
		},
		bind: "mode"
	}
};

pageLoader.model("pageLoaderModel", pageLoaderModel);