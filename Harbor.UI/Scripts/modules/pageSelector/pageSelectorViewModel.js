
pageSelector.pageSelectorViewModel = {
	initialize: function (attrs, options) {
		this.pagerModel = options.pagerModel;
	},
	
	defaults: {
		search: null,
		resultsCount: 0,
		resultsMessage: ""
	},

	resultsMessage: {
		get: function () {
			var str = "";
			
			if (!this.get("search")) {
				if (this.get("resultsCount") === 0) {
					str = "Enter a search term.";
				} else {
					str = "";
				}
			} else if (this.get("resultsCount") === 0) {
				str = "There are no pages. Try changing the search term.";
			}
			
			return str ? "<hr><div class='text-center'>" + str + "</div><hr>" : "";
		},
		bind: ["resultsCount"]
	}
};


pageSelector.model("pageSelectorViewModel", pageSelector.pageSelectorViewModel);