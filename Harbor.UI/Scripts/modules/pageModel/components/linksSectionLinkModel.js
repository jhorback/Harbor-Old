
pageModel.linkSectionLinkModel = function (attrs, options, location, pageurl) {
	this.location = location;
	this.pageurl = pageurl;
};


pageModel.linkSectionLinkModel.prototype = {
	defaults: {
		pageID: null,
		text: null,
		//
		url: null,
		itemClassName: null,
		cid: null
	},
	
	initialize: function () {
		this.on("change:pageID change:text", this.save);
	},
	
	"[itemClassName]": {
		get: function (value) {
			var url = "/" + this.get("pageID");
			return decodeURI(this.location.pathname.toLowerCase()).indexOf(url.toLowerCase()) > -1 ?
				"selected" : null;
		}
	},
	
	"[cid]": {
		get: function (value) {
			return this.cid;
		}
	},
	
	"[url]": {
		get: function () {
			return this.pageurl.get(this.get("pageID"), this.get("text"));
		}
	},

	save: function () {
		this.trigger("save");
	}
};

pageModel.model("linkSectionLinkModel", [
	"attrs",
	"options",
	"location",
	"pageurl",
	pageModel.linkSectionLinkModel
]);
