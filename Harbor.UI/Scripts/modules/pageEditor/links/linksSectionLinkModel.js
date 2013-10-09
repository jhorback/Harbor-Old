

pageEditor.linkSectionLinkModel = function (attrs, options, location) {
	this.location = location;
};


pageEditor.linkSectionLinkModel.prototype = {
	defaults: {
		pageID: null,
		text: null,
		itemClassName: null
	},
	"[itemClassName]": {
		get: function (value) {
			var url = "/" + this.get("pageID") + "/" + this.get("text");
			return decodeURI(this.location.pathname.toLowerCase()).indexOf(url.toLowerCase()) > -1 ?
				"selected" : null;
		}
	}
};

pageEditor.model("linkSectionLinkModel", [
	"attrs",
	"options",
	"location",
	pageEditor.linkSectionLinkModel
]);
