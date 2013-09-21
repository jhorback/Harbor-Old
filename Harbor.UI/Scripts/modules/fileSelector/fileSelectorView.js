
/*
	options : {
		filter: "none | images",
		select: function (file) { },
		close: function () { },
	}
*/
function fileSelectorView(options, modelFactory, fileRepo) {

	this.fileRepo = fileRepo;

	this.model = modelFactory.create("fileSelectorViewModel", {
		title: options.filter === "images" ? "Images" : "Files"
	});

	this.model.files = fileRepo.createFiles();
	
	this.listenTo(this.model.files, "all", function () {
		this.model.set("resultsCount", this.model.files.length);
	}, this);
}

fileSelectorView.prototype = {
	initialize: function () {
		
		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},
	
	search: function () {
		var searchTerm = this.model.get("search");
		
		this.fileRepo.fetchFiles(this.model.files, {
			orderDesc: "modified",
			filter: this.options.filter,
			name: searchTerm
		});

	},

	formSubmit: function (event) {
		
		event.preventDefault();
		this.search();
	},
	
	selectThisAndClose: function (event) {
		var selectedFileID = $(event.target).closest("[fileId]").attr("fileId");

		this.selectAndClose(selectedFileID);
	},
	
	selectThisAndCloseOnEnter: function (event) {
		
		if (event.keyCode == 13) {
			this.selectAndClose($(event.target).attr("fileId"));
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


fileSelector.view("fileSelectorView", ["options", "modelFactory", "fileRepo", fileSelectorView]);