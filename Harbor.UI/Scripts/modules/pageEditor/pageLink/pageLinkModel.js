

pageEditor.pageLinkModel = function (attrs, options, appurl) {
	this.appurl = appurl;
};

pageEditor.pageLinkModel.prototype = {
	component:  {
		pageProperties: ["pageID", "tileDisplay"],
	
		getDefaults: function (page, pageProperties) {
			return _.pick(page.getPageLink(pageProperties.pageID),
				"title", "previewText", "previewImageID", "link");
		}
	},
	
	defaults: {
		pageID: 0,
		tileDisplay: "normal",
		title: null,
		previewText: null,
		previewImageID: null,
		previewImageSrc: null,
		tileClassName: "tile",
		link: null,
		hasPreviewImage: false
	},
	
	initialize: function () {
		debugger;
	},
	
	hasPageLink: function () {
		return this.get("pageID") > 0 ? true : false;
	},
	
	previewImageSrc: {
		get: function (value) {
			var src = this.appurl.get("file/" +
				this.get("previewImageID") + "/preview.img?res=low");
			return src;
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
	}
};


pageEditor.model("pageLinkModel", [
	"attrs",
	"options",
	"appurl",
	pageEditor.pageLinkModel
]);
