
function pageurl(appurl) {
	return {
		get: function (pageID, title) {
			return title ? appurl.get("id/" + pageID + "/" + title.toLowerCase().replace(/ /g, "-")) : null;
		}
	};
}

pageModel.service("pageurl", ["appurl", pageurl]);