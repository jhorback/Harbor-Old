
fileAdmin.fileAdminViewModel = function (attrs, options, slugify, todaysAlbumName) {

	this.uploadTargetId = slugify(todaysAlbumName);

};


fileAdmin.fileAdminViewModel.prototype = {
	defaults: {
		state: "default", // can be default, uploading, ready
		uploadButtonText: "Upload files",
		uploadButtonDisabled: false,
		uploadTargetId: null,
		uploadTargetViewVisible: false
	},
	
	initialize: function () {
		this.set("uploadTargetId", this.uploadTargetId);
	},
	
	uploadTargetViewVisible: {
		get: function () {
			return this.get("state") !== "default";
		},
		bind: ["state"]
	},
	
	uploadButtonText: {
		get: function () {
			var text,
				state = this.get("state");
			text = state !== "default" ? "Done" : "Upload files";
			return text;
		},
		
		bind: ["state"]
	},
	
	uploadButtonDisabled: {
		get: function () {
			var state = this.get("state");
			return state === "uploading" ? true : false;
		},
		
		bind: ["state"]
	},
	
	toggleUploadState: function () {
		var state = this.get("state");
		if (state === "default") {
			this.set("state", "ready");
		} else {
			this.set("state", "default");
		}
	}
};

fileAdmin.model("fileAdminViewModel", [
	"attrs", "options", "slugify", "todaysAlbumName",
	fileAdmin.fileAdminViewModel]);