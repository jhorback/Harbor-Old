
pageEditor.imageModel = {
	
	component: {
		pageProperties: ["fileID", "res"],
	
		getDefaults: function () {
			return {};
		}
	},
	
	defaults: {
		fileID: null,	
		res: "low", // can be low or high
		imgSrc: null,
		ext: null,
		name: null
	},
	
	hasImage: function () {
		return this.get("fileID") ? true : false;
	},
	
	imgSrc: {
		get: function (value) {
			return Application.url("file/" +
				this.get("fileID") + "/" + this.get("name") + "." +
				this.get("ext") + "?res=" + this.get("res"));
		}
	},
	
	ext: {
		get: function (value) {
			return value;
		}
	}
};

pageEditor.model("imageModel", pageEditor.imageModel);
