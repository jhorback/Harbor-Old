
fileAdmin.fileAdminView = function (options, modelFactory, fileAdminRepo, fileAdminRouter) {

	this.model = modelFactory.create("fileAdminViewModel");
	this.model.albums = fileAdminRepo.getAlbums();
	this.fileAdminRouter = fileAdminRouter;
};


fileAdmin.fileAdminView.prototype = {

	events: {
		"click .tile": function (event) {
			var fileId = $(event.target).closest(".tile").attr("id");
			
			event.preventDefault();
			this.editFile(fileId);
		}
	},
	
	editFile: function (fileId) {
		this.fileAdminRouter.editFile(fileId);
	},
	
	clickUpload: function (event) {
		event.preventDefault();
		this.model.toggleUploadState();
	}
};


fileAdmin.view("fileAdminView", [
	"options", "modelFactory", "fileAdminRepo", "fileAdminRouter",
	fileAdmin.fileAdminView]);