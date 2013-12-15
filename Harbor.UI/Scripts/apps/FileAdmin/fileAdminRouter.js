
function fileAdminRouter(editFile, appurl, fileAdminViewModelRepo) {
	this.editFileComponent = editFile;
	this.root = appurl.get("user/files/");
	this.model = fileAdminViewModelRepo.getViewModel();
	this.fileAdminViewModelRepo = fileAdminViewModelRepo;
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
	
	syncUrl: function () {
		var filter = this.model.get("filter");
		if (filter === "none") {
			this.navigate("search/" + this.model.get("search"));
		} else if (this[filter]) {
			this.navigate(filter);
		} else {
			alert("Filter not defined on the router: " + filter);
		}
	},

	editFile: function (fileId) {
		function renderFileComponent(file) {
			file.set("allowClose", this.model.get("filter") !== "");
			this.editFileComponent.render({
				model: file
			}).on("close", function () {
				this.editFileComponent.close();
				this.syncUrl();
			}, this);
			this.navigate("edit/" + fileId);
		}

		this.fileAdminViewModelRepo.getFile(fileId).then(_.bind(renderFileComponent, this));
	}
};

fileAdmin.router("fileAdminRouter", [
	"editFile", "appurl", "fileAdminViewModelRepo",
	fileAdminRouter]);