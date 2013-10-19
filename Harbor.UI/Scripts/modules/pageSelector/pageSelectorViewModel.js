
pageSelector.pageSelectorViewModel = {
	defaults: {
		search: null,
		resultsCount: 0,
		resultsMessage: ""
	},

	resultsMessage: {
		get: function () {
			if (!this.get("search")) {
				if (this.get("resultsCount") === 0) {
					return "Enter a search term.";
				} else {
					return "";
				}
			}

			if (this.get("resultsCount") === 0) {
				return "There are no pages. Try changing the search term.";
			}

			return "";
		},
		bind: ["resultsCount"]
	}
};


pageSelector.model("pageSelectorViewModel", pageSelector.pageSelectorViewModel);