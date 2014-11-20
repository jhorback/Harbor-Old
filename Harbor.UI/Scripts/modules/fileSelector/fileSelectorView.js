/*
	options : {
		filter - "none | images". If "images", uploads will be limited to bitmap extensions
		select: function (file) { } - Called each time a file is uploaded.
		done: function () {} - Called when all files have completed being uploaded.
		close: function () { },
		maxFiles - Set to limit the number of files allowed to be uploaded.
		autoClose - When all files have completed uploading, the file selector will close itself.
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
		this.bindAll("onUpload", "onAcceptFile", "uploadComplete");

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
		this.on("done", this.uploadComplete);
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

		this.trigger("select", file);
		this.close();
	},

	clickUpload: function () {
		this.setupDropTarget();
	},
	
	setupDropTarget: function () {
		var el = this.$("#fileselectorview-upload"),
		    dz;

		if (el.hasClass("dropzone")) {
			return;
		}

		el.addClass("dropzone");
		dz = new Dropzone(el[0], {
			url: this.uploadUrl,
			success: this.onUpload,
			accept: this.onAcceptFile,
			maxFiles: this.options.maxFiles,
			queuecomplete: this.uploadComplete
		});

		dz.on("queuecomplete", this.uploadComplete);
	},

	onAcceptFile: function (file, done) {
		if (this.options.filter !== "images") {
			done();
		}

		var ext = file.name.toLowerCase().split(".").pop();

		if (this.model.isBitmap(ext) === false) {
			done(file.name + " is not an image.");
		} else {
			done();
		}
	},

	onUpload: function (uploadedFile, response) {
		var file = this.modelFactory.create("file", response);
		uploadedFile.previewElement.classList.add("dz-success");
		this.trigger("select", file);
	},

	uploadComplete: function () {
		this.options.done && this.options.done();
		if (this.options.autoClose !== false) {
			this.close();
		}
	}
};


fileSelector.view("fileSelectorView", [
	"options",
	"modelFactory",
	"fileRepo",
	"appurl",
	fileSelectorView
]);