
fileAdmin.fileAdminView = function (options, modelFactory, fileRepo) {

	this.model = modelFactory.create("fileAdminViewModel");
	this.model.albums = fileRepo.getAlbums();
};

fileAdmin.fileAdminView.prototype = {
	
	uploadTargetView: null,

	initialize: function () {
		this.uploadingCount = 0;
		
		this.listenTo(this.model, "change:state", this.stateChange);
		
		// this.listenTo(FileAdmin.events, "file:removed", this.removeFile);
		// this.listenTo(FileAdmin.events, "uploadStarted", this.uploadStarted);
		// this.listenTo(FileAdmin.events, "uploadFinished", this.uploadFinished);
	},
	
	clickUpload: function (event) {
		event.preventDefault();
		this.model.toggleUploadState();
	},
	
	uploadStarted: function () {
		this.uploadingCount++;
		this.model.set("state", "uploading");
	},
	
	uploadFinished: function () {
		this.uploadingCount--;
		this.model.set("state", "ready");		
	},
	
	addFile: function (file) {
		FileAdmin.trigger("fileAdded", file);
	},
	
	removeFile: function (file) {
	    var el = this.$el.find("#" + file.get("id")).addClass("attn");
		setTimeout(function () {
			el.fadeOut("slow", function () {
				el.remove();
			});
		}, 0);
	}
};


fileAdmin.view("fileAdminView", [
	"options", "modelFactory", "fileRepo",
	fileAdmin.fileAdminView]);