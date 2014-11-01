

pageAdder.pageAdderViewModel = function (attrs, options, appurl) {
	this.urlRoot = appurl.get("api/pages");
};

pageAdder.pageAdderViewModel.prototype = {
	defaults: {
		title: null,
		hasOtherPageTypes: null,
		pageTypeKey: null
	},
	"[title]": {
		validation: {
			required: true
		}
	}
};

pageAdder.model("pageAdderViewModel",
	"attrs",
	"options",
	"appurl",
	pageAdder.pageAdderViewModel
);