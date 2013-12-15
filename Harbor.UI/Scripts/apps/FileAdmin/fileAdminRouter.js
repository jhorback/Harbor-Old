
function fileAdminRouter(editFile, appurl, fileAdminViewModelRepo) {
	this.editFileComponent = editFile;
	this.root = appurl.get("user/files/");
	this.model = fileAdminViewModelRepo.getViewModel();
}


fileAdminRouter.prototype = {
	routes: {
		"recent": "recent",
		"images": "images",
		"audio": "audio",
		"video": "video",
		"documents": "documents",
		"search/:search": "search",
		"edit/:id": "editFile",
		"*defaultRoute": "defaultRoute"
	},

	defaultRoute: function () {
		this.editFileView && this.editFileView.close();
		this.model.set("filter", "recent");
		this.navigate("/");
	},
	
	recent: function () {
		this.model.set("filter", "recent");
		this.navigate("recent");
	},
	
	images: function () {
		this.model.set("filter", "images");
		this.navigate("images");
	},
	
	audio: function () {
		this.model.set("filter", "audio");
		this.navigate("audio");
	},
	
	video: function () {
		this.model.set("filter", "video");
		this.navigate("video");
	},
	
	documents: function () {
		this.model.set("filter", "documents");
		this.navigate("documents");
	},
	
	search: function (search) {
		this.model.set({
			"filter": "none",
			"search": search
		});
		this.navigate("search/" + search);
	},

	editFile: function (fileId) {
		
		this.fileAdminViewModelRepo.getFile(fileId).then(_.bind(function (file) {
			this.editFileView = this.editFileComponent.render({
				model: file
			}).on("close", function () {
				this.defaultRoute();
			}, this);
			this.navigate("edit/" + fileId);
		}, this));
	}
};

fileAdmin.router("fileAdminRouter", [
	"editFile", "appurl", "fileAdminViewModelRepo",
	fileAdminRouter]);