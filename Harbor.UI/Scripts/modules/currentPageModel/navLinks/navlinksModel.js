


currentPageModel.navLinks = function (attrs, options, appurl) {
	this.urlRoot = appurl.get("api/navlinks");
};


currentPageModel.navLinks.prototype =  {
	defaults: {
		id: null,
		name: null,
		userName: null,
		sections: [] // title, links 
	}
};



currentPageModel.model("navLinks", ["attrs", "options", "appurl", currentPageModel.navLinks]);
