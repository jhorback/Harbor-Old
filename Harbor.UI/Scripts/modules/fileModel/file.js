

fileModel.file = function (attrs, options, appurl) {
	
	this.urlRoot = appurl.get("api/files");
};


fileModel.file.prototype = {
	defaults: {
		id: null,
		userName: null,
		album: null,
		name: null,
		contentType: null,
		ext: null,
		description: null,
		"public": null,
		uploaded: null,
		modified: null,
		size: null,
		isBitmap: false,
		thumbUrl: null,
		totalSize: null,
		href: null,
		lowResUrl: null,
		highResUrl: null,
		//
		editLink: null,
		publicDisplay: null
	},
	
	//	href: {
	//		get: function (value) {
	//			return value && Application.url(value);
	//		},
	//		set: function (value) {
	//			return value;
	//		}
	//	},
	//	
	//	lowResUrl: {
	//		get: function (value) {
	//			return value && Application.url(value);
	//		}
	//	},
	//	
	//	highResUrl: {
	//		get: function (value) {
	//			return value && Application.url(value);
	//		}
	//	},
	//	
	//	thumbUrl: {
	//		get: function (value) {
	//			return value && Application.url(value);
	//		}
	//	},
	
	"[name]": {
		validate: {
			required: { message: "The file name is required." }
		}
	},
	
	editLink: {
		get: function () {
			return Application.url("user/files/edit/") + this.get("id");
		}
	},
	
	publicDisplay: {
		get: function () {
			return this.get("public") ? "This file is public" : "This file is private";
		},
		bind: ["public"]
	}
};


fileModel.model("file", ["attrs", "options", "appurl", fileModel.file])