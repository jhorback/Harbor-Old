
pageEditor.imageModel = function (attrs, options) {

};

pageEditor.imageModel.prototype = {
	
	component: {
		pageProperties: ["fileID", "res"],
	
		getDefaults: function () {
			return {};
		}
	},
	
	initialize: function (attrs, options) {
		var fileID = this.get("fileID");
		var file = options.page.getFile(fileID);
		this.set("fileExists", file !== null);
	},
	
	defaults: {
		fileID: null,	
		res: "low", // can be low or high
		imgSrc: null,
		ext: null,
		name: null,
		//
		fileExists: true,
		fileDoesNotExist: false
	},

	imgSrc: {
		get: function (value) {
			return Application.url("file/" +
				this.get("fileID") + "/" + this.get("name") + "." +
				this.get("ext") + "?res=" + this.get("res"));
		},
		
		bind: ["res", "fileID"]
	},
	
	ext: {
		get: function (value) {
			return value;
		}
	},
	
	fileDoesNotExist: {
		get: function (value) {
			return !this.get("fileExists");
		},
		bind: ["fileExists"]
	}
};

pageEditor.model("imageModel", ["attrs", "options", pageEditor.imageModel]);
