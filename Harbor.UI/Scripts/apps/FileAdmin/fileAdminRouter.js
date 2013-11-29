
function fileAdminRouter(fileAdminRepo, editFile, appurl, Backbone) {
	this.fileAdminRepo = fileAdminRepo;
	this.editFileComponent = editFile;
	this.root = appurl.get("user/files/");
	this.history = Backbone.history;
}


fileAdminRouter.prototype = {
	routes: {
		"recent": "recent",
		"images": "images",
		"audio": "audio",
		"video": "video",
		"documents": "documents",
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
	
	search: function (search) {
		this.model.set({
			"filter": "search",
			"search": search
		});
		this.navigate("search/" + search);
	},

	editFile: function (fileId) {
		this.fileAdminRepo.getFile(fileId).then(_.bind(function (file) {
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
	"fileAdminRepo", "editFile", "appurl", "Backbone",
	fileAdminRouter]);