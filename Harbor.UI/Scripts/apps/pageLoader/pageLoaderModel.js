
var pageLoaderModel = {
	defaults: {
		mode: "view",
		doneButtonVisible: false
	},

	doneButtonVisible: {
		get: function (value) {
			var ret;
			if (this.get("mode") === "view") {
				ret = false;
			} else {
				ret = true;
			}
			// console.debug("doneButtonVisible", ret);
			return ret;
		},
		bind: ["mode"]
	}
};

pageLoader.model("pageLoaderModel", pageLoaderModel);