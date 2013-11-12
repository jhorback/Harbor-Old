
function fileAdminRouter(fileAdminRepo, editFile, appurl, Backbone) {
	this.fileAdminRepo = fileAdminRepo;
	this.editFileComponent = editFile;
	this.root = appurl.get("user/files/");
	this.history = Backbone.history;
}


fileAdminRouter.prototype = {
	routes: {
		"edit/:id": "editFile",
		"*defaultRoute": "admin"
	},

	admin: function () {
		this.editFileView && this.editFileView.close();
		this.navigate("/");
	},

	editFile: function (fileId) {
		this.fileAdminRepo.getFile(fileId).then(_.bind(function (file) {
			this.editFileView = this.editFileComponent.render({
				model: file
			}).on("close", function () {
				this.admin();
			}, this);
			this.navigate("edit/" + fileId);
		}, this));
	}
};

fileAdmin.router("fileAdminRouter", [
	"fileAdminRepo", "editFile", "appurl", "Backbone",
	fileAdminRouter]);