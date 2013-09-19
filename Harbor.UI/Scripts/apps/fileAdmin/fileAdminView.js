
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
	
	stateChange: function () {
		//var state = this.model.get("state");
		//if (state === "ready") {
		//	this.uploadTargetView.$el.fadeIn();
		//} else if (state === "default") {
		//	this.uploadTargetView.$el.fadeOut();
		//	FileAdmin.files.fetch();
		//}
	},
	
	uploadStarted: function () {
		this.uploadingCount++;
		this.model.set("state", "uploading");
	},
	
	uploadFinished: function () {
		this.uploadingCount--;
		this.model.set("state", "ready");		
	},

	//render: function () {
	//	this.template("FileAdmin-Main", this.$el)();
		
	//	var albumsView =  new FileAdmin.AlbumsView({
	//		collection: this.collection
	//	});
	//	this.$("#fileadmin-filelist").html(albumsView.render().el);
		
	//	this.bindModelToView(this.model, this.$(".page-header"));

	//	this.renderUploadTarget();
	//	return this;
	//},
	
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