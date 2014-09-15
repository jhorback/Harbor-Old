

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
		// merchantID: null, // jch! fill this out - also need to render the other button if count > 0 if 0 then empty
		// product link properties
		productCount: 0,
		firstButton: null
	},

	initialize: function () {
		this.on("change:productCount change:firstButton", this.onRender);
		this.firstButton = this.modelFactory.create("payPalButton", this.attributes.firstButton);
		debugger;
	},

	hasPageLink: function () {
		return this.get("pageID") > 0 ? true : false;
	},
	
	"[previewImageSrc]": {
		get: function (value) {
			var previewImageID = this.get("previewImageID"),
				src;
			src = previewImageID ? this.appurl.get("file/" +
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
	},

	"[firstButton]": {
		set: function (value) {
			this.firstButton && this.firstButton.set(value);
			return value;
		}
	}
};


pageEditor.model("productlinkModel", [
	"attrs",
	"options",
	"appurl",
	"modelFactory",
	pageEditor.productLinkModel
]);
