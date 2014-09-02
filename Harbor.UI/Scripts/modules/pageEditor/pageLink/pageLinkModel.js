

pageEditor.pagelinkModel = function (attrs, options, appurl, pageurl) {
	this.appurl = appurl;
	this.pageurl = pageurl;
};

pageEditor.pagelinkModel.prototype = {
	syncPageProperties: ["pageID", "tileDisplay"],
	
	defaults: {
		pageID: 0,
		tileDisplay: "normal",
		title: null,
		previewText: null,
		previewImageID: null,
		link: null,
		previewImageSrc: null,
		tileClassName: "tile",
		hasPreviewImage: false
	},
	
	hasPageLink: function () {
		return this.get("pageID") > 0 ? true : false;
	},
	
	previewImageSrc: {
		get: function (value) {
			var previewImageID = this.get("previewImageID"),
				src;
			src = previewImageID ? this.appurl.get("file/" +
				previewImageID + "/preview.img?res=low") :
				null;
			return src;
		},
		bind: ["pageID"]
	},
	
	hasPreviewImage: {
		get: function (value) {
			var src = this.get("previewImageSrc");
			return src ? true : false;
		},
		bind: ["pageID"]
	},
	
	tileClassName: {
		get: function (value) {
			var display = this.get("tileDisplay");
			var val = display === "wide" ? "tile tile-wide" : "tile";
			return val;
		},
		bind: ["tileDisplay"]
	},

	"[link]": {
		get: function () {
			return this.pageurl.get(this.attributes.pageID, this.attributes.title);
		},
		observe: ["pageID", "title"]
	}
};


pageEditor.model("pagelinkModel", [
	"attrs",
	"options",
	"appurl",
	"pageurl",
	pageEditor.pagelinkModel
]);
