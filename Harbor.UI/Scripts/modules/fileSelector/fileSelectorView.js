
/*
	options : {
		filter: "none | images",
		select: function (file) { },
		close: function () { },
	}
*/
function fileSelectorView(options, modelFactory, fileRepo) {
	var pagerModel;

	this.fileRepo = fileRepo;

	pagerModel = modelFactory.create("pagerModel", {
		take: 20,
		totalCount: 0
	});
	
	this.model = modelFactory.create("fileSelectorViewModel", {
		title: options.filter === "images" ? "Images" : "Files"
	}, {
		pagerModel: pagerModel
	});

	this.model.files = fileRepo.createFiles();
	
	this.listenTo(this.model.files, "sync", this.onSync);
	this.listenTo(pagerModel, "change:skip", this.search);
}

fileSelectorView.prototype = {
	initialize: function () {
		
		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},
	
	onSync: function () {
		var totalCount = this.model.files.totalCount;
		this.model.pagerModel.set("totalCount", totalCount);
		this.model.set("resultsCount", totalCount);
		this.model.refresh("resultsMessage");
		this.$el.closest("body").scrollTop(0);
	},
	
	search: function (event) {
		var searchTerm = this.model.get("search");
		
		this.fileRepo.fetchFiles(this.model.files, this.model.pagerModel.extend({
			orderDesc: "modified",
			filter: this.options.filter,
			name: searchTerm
		}));
	},

	formSubmit: function (event) {
		event.preventDefault();
		this.model.pagerModel.first();
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