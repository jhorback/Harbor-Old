
fileAdmin.fileAdminView = function (options, modelFactory, fileAdminRepo, editFileComponent) {

	this.model = modelFactory.create("fileAdminViewModel");
	this.model.albums = fileAdminRepo.getAlbums();
	this.fileAdminRepo = fileAdminRepo;
	this.editFileComponent = editFileComponent;
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
		var file;

		file = this.fileAdminRepo.getFile(fileId);
		this.editFileComponent.render({
			model: file
		});
	},
	
	clickUpload: function (event) {
		event.preventDefault();
		this.model.toggleUploadState();
	}
};


fileAdmin.view("fileAdminView", [
	"options", "modelFactory", "fileAdminRepo", "editFile",
	fileAdmin.fileAdminView]);