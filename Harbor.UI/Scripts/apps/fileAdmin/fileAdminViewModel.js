
fileAdmin.fileAdminViewModel = function (attrs, options, slugify, todaysAlbumName) {

	this.uploadTargetId = slugify(todaysAlbumName);
	this.pagerModel = options.pagerModel;
	this.albums = options.albums;
};


fileAdmin.fileAdminViewModel.prototype = {
	defaults: {
		state: "default", // can be default, uploading, ready
		filter: null, // recent, images, audio, video, search
		search: "",
		uploadButtonText: "Upload files",
		uploadButtonDisabled: false,
		uploadTargetId: null,
		uploadTargetViewVisible: false,
		noResultsMsg: "",
		thereAreNoResults: false
	},
	
	initialize: function () {
		this.set("uploadTargetId", this.uploadTargetId);
		
		this.pagerModel.on("change:totalCount", function () {
			var results =  this.get("thereAreNoResults");
			this.set("thereAreNoResults", results);
		}, this);
	},
	
	filters: [{
		text: "Recent",
		value: "recent",
		href: "user/files/recent",
		noResultsMsg: "There are no recent files."
	}, {
		text: "Images",
		value: "images",
		href: "user/files/images",
		noResultsMsg: "There are no images."
	}, {
		text: "Audio",
		value: "audio",
		href: "user/files/audio",
		noResultsMsg: "There are no audio files."
	}, {
		text: "Video",
		value: "video",
		href: "user/files/video",
		noResultsMsg: "There are no videos."
	}, {
		text: "Documents",
		value: "documents",
		href: "user/files/documents",
		noResultsMsg: "There are no documents."
	}],
	
	"[noResultsMsg]": {
		get: function (value) {
			var filter = _.find(this.filters, function (item) {
				return item.value === this.attributes.filter;	
			}, this);
			
			return filter ?
				filter.noResultsMsg :
				"No files matched your search";
		},
		bind: ["filter"]
	},
	
	"[thereAreNoResults]": {
		get: function (value) {
			var thereAreNoResults = this.pagerModel.get("totalCount") == 0;
			return thereAreNoResults;
		}
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