
pageEditor.linksSectionModel = function (attrs, options) {

	// jch! this.links need to be an array of page model
	// should be albe to query this from the current page.
};

pageEditor.linksSectionModel.prototype = {
	defaults: {
		title: null,
		hasTitle: false,
		links: []
	},

	"[hasTitle]": {
		get: function () {
			return this.get("title") ? true : false;
		}
	}
};


pageEditor.model("linksSectionModel", [
	"attrs",
	"options",
	pageEditor.linksSectionModel
]);