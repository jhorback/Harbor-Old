
var fileSelectorViewModel = {
	defaults: {
		title: "Files",
		search: null,
		resultsCount: 0,
		filesAreEmpty: true,
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
				return "There are no files. Try changing the search term.";
			}
			
			return "";
		},
		bind: ["search", "resultsCount"]
	}
};


fileSelector.model("fileSelectorViewModel", fileSelectorViewModel);