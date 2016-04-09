

pageEditor.productLinkModel = function (attrs, options, appurl, modelFactory) {

	this.appurl = appurl;
	this.modelFactory = modelFactory;
};


pageEditor.productLinkModel.prototype = {
	syncPageProperties: ["pageID", "tileDisplay"],
	
	defaults: {
		pageID: 0,
		tileDisplay: "normal",
		title: null,
		previewText: null,
		previewImageID: null,
		previewImageSrc: null,
		tileClassName: "tile",
		link: null,
		hasPreviewImage: false,
		buttons: [],
		// product link properties
		productCount: 0
	},

	initialize: function () {
		this.buttons = this.collectionFactory.createGeneric(this.attributes.buttons);
		this.on("sync", this.onSync);
	},

	onSync: function () {
		this.buttons.set(this.attributes.buttons);
	},

	hasPageLink: function () {
		return this.get("pageID") > 0 ? true : false;
	},
	
	"[previewImageSrc]": {
		get: function (value) {
			var previewImageID = this.get("previewImageID"),
				src;
			src = previewImageID ? this.appurl("file/" +
				this.get("previewImageID") + "/preview.img?res=low") :
				null;
			return src;
		},
		bind: ["pageID"]
	},
	
	"[hasPreviewImage]": {
		get: function (value) {
			var src = this.get("previewImageSrc");
			return src ? true : false;
		},
		bind: ["pageID"]
	},
	
	"[tileClassName]": {
		get: function (value) {
			var display = this.get("tileDisplay");
			var val = display === "wide" ? "tile tile-wide" : "tile";
			return val;
		},
		bind: ["tileDisplay"]
	}
};


pageEditor.model("productlinkModel", [
	"attrs",
	"options",
	"appurl",
	"modelFactory",
	pageEditor.productLinkModel
]);
