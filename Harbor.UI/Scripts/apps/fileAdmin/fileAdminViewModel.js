
fileAdmin.fileAdminViewModel = function (attrs, options, slugify, todaysAlbumName) {

	this.uploadTargetId = slugify(todaysAlbumName);
	this.pagerModel = options.pagerModel;
	this.albums = options.albums;
};


fileAdmin.fileAdminViewModel.prototype = {
	defaults: {
		state: "default", // can be default, uploading, ready
		filter: "", // recent, images, audio, video, search
		search: "",
		uploadButtonText: "Upload files",
		uploadButtonDisabled: false,
		uploadTargetId: null,
		uploadTargetViewVisible: false
	},
	
	initialize: function () {
		this.set("uploadTargetId", this.uploadTargetId);
	},
	
	filters: [{
		text: "Recent",
		value: "recent",
		href: "user/files/recent"
	}, {
		text: "Images",
		value: "images",
		href: "user/files/images"
	}, {
		text: "Audio",
		value: "audio",
		href: "user/files/audio"
	}, {
		text: "Video",
		value: "video",
		href: "user/files/video"
	}, {
		text: "Documents",
		value: "documents",
		href: "user/files/documents"
	}],

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