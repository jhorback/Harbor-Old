
function fileAdminRouter(appurl, fileAdminViewModelRepo) {
	this.setRoot("user/files/");
	this.model = fileAdminViewModelRepo.getViewModel();
	this.fileAdminViewModelRepo = fileAdminViewModelRepo;
}


fileAdminRouter.prototype = {
	routes: {
		"recent": {
			url: ""
		},
		"images": {},
		"audio": {},
		"video": {},
		"documents": {},
		"search/:search": {
			name: "search",
			url: function (search) {
				return "search/" + search;
			}
		},
		"edit/:id": {
			name: "editFile",
			url: function (id) {
				return "edit/" + id;
			}
		},
		"*default": {
			name: "default",
			url: "",
			callback: "files"
		}
	},

	files: function () {
		if (!this.model.attributes.filter) {
			this.model.set("filter", "recent");
		}
		this.showFileAdmin();
	},
	
	recent: function () {
		this.model.set("filter", "recent");
		this.showFileAdmin();
	},
	
	images: function () {
		this.model.set("filter", "images");
		this.showFileAdmin();
	},
	
	audio: function () {
		this.model.set("filter", "audio");
		this.showFileAdmin();
	},
	
	video: function () {
		this.model.set("filter", "video");
		this.showFileAdmin();
	},
	
	documents: function () {
		this.model.set("filter", "documents");
		this.showFileAdmin();
	},
	
	search: function (search) {
		this.model.set({
			"filter": "none",
			"search": search
		});
		this.showFileAdmin();
	},
	
	showFileAdmin: function () {
		this.showComponent("fileAdminComponent", {
			region: "#frame-body"
		});
	},

	//syncUrl: function () {
	//	var filter = this.model.get("filter");
	//	if (filter === "none") {
	//		this.navigate("search/" + this.model.get("search"));
	//	} else if (this[filter]) {
	//		this.navigate(filter);
	//	} else {
	//		alert("Filter not defined on the router: " + filter);
	//	}
	//},

	editFile: function (fileId) {
		
		function renderFileComponent(file) {
			file.set("allowClose", this.model.get("filter") !== "");
			this.showComponent("editFileComponent", {
				model: file
			});

			//this.editFileComponent.render({
			//	model: file
			//}).on("close", function () {
			//	this.editFileComponent.close();
			//	this.syncUrl();
			//}, this);
			//this.navigate("edit/" + fileId);
		}

		this.fileAdminViewModelRepo.getFile(fileId).then(_.bind(renderFileComponent, this));
	}
};

fileAdmin.router("fileAdminRouter", [
	"appurl", "fileAdminViewModelRepo",
	fileAdminRouter]);