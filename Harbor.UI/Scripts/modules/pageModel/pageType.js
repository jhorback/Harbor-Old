

function pageType(attrs, options, appurl) {
	this.urlRoot = appurl.get("api/pagetypes");
};

pageType.prototype = {
	defaults: {
		key: null,
		name: null,
		description: null
	}
};



function pageTypes(models, options, appurl) {
	this.url = appurl.get("api/pagetypes");
}

pageTypes.prototype = {
	model: "pageType"
};



pageModel.model("pageType", ["attrs", "options", "appurl", pageType]);
pageModel.collection("pageTypes", ["models", "options", "appurl", pageTypes]);
