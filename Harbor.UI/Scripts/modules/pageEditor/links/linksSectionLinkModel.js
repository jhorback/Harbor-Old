

pageEditor.linkSectionLinkModel = function (attrs, options, location) {
	this.location = location;
};


pageEditor.linkSectionLinkModel.prototype = {
	defaults: {
		pageID: null,
		text: null,
		//
		itemClassName: null,
		cid: null
	},
	"[itemClassName]": {
		get: function (value) {
			var url = "/" + this.get("pageID") + "/" + this.get("text");
			return decodeURI(this.location.pathname.toLowerCase()).indexOf(url.toLowerCase()) > -1 ?
				"selected" : null;
		}
	},
	
	"[cid]": {
		get: function (value) {
			return this.cid;
		}
	}
};

pageEditor.model("linkSectionLinkModel", [
	"attrs",
	"options",
	"location",
	pageEditor.linkSectionLinkModel
]);
