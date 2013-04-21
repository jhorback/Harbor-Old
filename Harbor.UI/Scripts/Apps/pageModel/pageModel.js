
var pageModel = {
	pageTypes: null,

	getPageUrl: function (pageID, title) {
		return title ? Application.url("id/" + pageID + "/" + title.toLowerCase().replace(/ /g, "-")) : null;
	},

	init: function () {
		var dfd = $.Deferred();
		pageModel.pageTypes = new pageModel.PageTypes();
		AjaxRequest.handle(pageModel.pageTypes.fetch(), {
			success: dfd.resolve
		});
		return dfd.promise();
	}
};
