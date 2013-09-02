

function pageType(appurl) {
	this.urlRoot = appurl.get("api/pagetypes");
};

pageType.prototype = {
	defaults: {
		key: null,
		name: null,
		description: null
	}
};



function pageTypes(appurl) {
	this.urlRoot = appurl.get("api/pagetypes");
}

pageTypes.prototype = {
	model: "pageType"
};



pageModel.model("pageType", ["appurl", pageType]);
pageModel.collection("pageTypes", ["appurl", pageTypes]);
