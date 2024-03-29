﻿
var fileSelectorViewModel = {
	initialize: function (attrs, options) {
		this.pagerModel = options.pagerModel;
	},
	
	defaults: {
		title: "Files",
		search: null,
		resultsCount: 0,
		resultsMessage: ""
	},
	
	// From Harbor.Domain.Files.File.cs
	BitmapExtensions: [".bmp", ".gif", ".exif", ".jpg", ".png", ".tiff" ],

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
				str = "There are no files. Try changing the search term.";
			}
			
			return str ? "<hr><div class='text-center'>" + str + "</div><hr>" : "";
		},
		bind: ["resultsCount"]
	},

	isBitmap: function (ext) {
		return _.contains(this.BitmapExtensions, "." + ext);
	}
};


fileSelector.model("fileSelectorViewModel", fileSelectorViewModel);