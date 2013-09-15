
/*
	options : {
		filter: "none | images",
		select: function (file) { },
		close: function () { },
	}
*/
function fileSelectorView(options, modelFactory, fileRepo) {
	
	this.model = modelFactory.create("fileSelectorViewModel", {
		title: options.filter === "images" ? "Images" : "Files"
	});

	this.model.files = fileRepo.getFiles({
		orderDesc: "modified",
		filter: options.filter
	});
}

fileSelectorView.prototype = {
	initialize: function () {
		
		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},

	search: function () {
		var searchTerm = this.model.get("search");
		
		this.model.files.search(searchTerm);
	},

	formSubmit: function (event) {
		
		event.preventDefault();
		this.search();
	},
	
	// gets the closest data-id attribute value to select
	selectThisAndClose: function (event) {
		var selectedFileID = $(event.target).closest("[data-id]").data("id");

		this.selectAndClose(selectedFileID);
	},
	
	selectThisAndCloseOnEnter: function (event) {
		
		if (event.keyCode == 13) {
			this.selectAndClose($(event.target).data("id"));
		}
	},
	
	selectAndClose: function (selectedFileID) {
		var file;

		file = this.model.files.find(function (item) {
			return item.get("id") === selectedFileID;
		});

		this.trigger("select", file);
		this.close();
	}
};


fileSelector.view("fileSelectorView", [fileSelectorView]);