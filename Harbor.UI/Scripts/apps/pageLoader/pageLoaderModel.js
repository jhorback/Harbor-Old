
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
				// not sure why I have to do this
				$("[data-bind='showif: doneButtonVisible']").hide();
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