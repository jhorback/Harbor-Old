/*
	options : {
		filter: "none | images",
		select: function (file) { },
		close: function () { },
	}
*/
function fileSelectorView(
	options,
	modelFactory,
	fileRepo,
	appurl
) {
	this.modelFactory = modelFactory;
	this.fileRepo = fileRepo;
	this.uploadUrl = appurl.get("file/upload");
}

fileSelectorView.prototype = {
	initialize: function (options) {
		this.bindAll("onUpload");

		this.model = this.modelFactory.create("fileSelectorViewModel", {
			title: options.filter === "images" ? "Images" : "Files"
		}, {
			pagerModel: this.modelFactory.create("pagerModel", {
				take: 20,
				totalCount: 0
			})
		});

		this.model.files = this.fileRepo.createFiles();
	
		this.listenTo(this.model.files, "sync", this.onSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.search);

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
	
	formSubmit: function (event) {
		event.preventDefault();
		this.model.pagerModel.first();
		this.search();
	},
	
	search: function (event) {
		var searchTerm = this.model.get("search");
		
		this.fileRepo.fetchFiles(this.model.files, this.model.pagerModel.extend({
			orderDesc: "modified",
			filter: this.options.filter,
			name: searchTerm
		}));
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

		this.selectAndCloseFile(file);
		
	},

	selectAndCloseFile: function (file) {
		this.trigger("select", file);
		this.close();
	},

	// jch! - working on this
	clickUpload: function () {
		this.setupDropTarget();
	},
	
	setupDropTarget: function () {
		var el = this.$("#fileselectorview-upload");

		el.addClass("dropzone");
		el.dropzone({
			url: this.uploadUrl,
			success: this.onUpload
		});
	},

	onUpload: function (uploadedFile, response) {
		var file = this.modelFactory.create("file", JSON.parse(response));
		uploadedFile.previewTemplate.addClass("success");
		this.selectAndCloseFile(file);
	}
};


fileSelector.view("fileSelectorView", [
	"options",
	"modelFactory",
	"fileRepo",
	"appurl",
	fileSelectorView
]);