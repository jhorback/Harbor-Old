
pageAdminViewModel = function (attrs, options) {
	this.pagerModel = options.pagerModel;	
};

pageAdminViewModel.prototype = {
	defaults: {
		search: ""
	}
};
pageAdmin.model("pageAdminViewModel", [
	"attrs",
	"options",
pageAdminViewModel]);