
fileAdmin.fileAdminViewModel = {
	defaults: {
		state: "default", // can be default, uploading, ready
		uploadButtonText: "Upload files",
		uploadButtonDisabled: false
	},
	
	uploadButtonText: {
		get: function () {
			var state = this.get("state");
			return state === "default" ? "Upload files" : "Done";
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