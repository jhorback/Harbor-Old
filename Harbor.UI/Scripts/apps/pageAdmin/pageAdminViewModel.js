
var pageAdminViewModel = function (attrs, options) {
	this.pagerModel = options.pagerModel;
	this.pages = options.pages;
};

pageAdminViewModel.prototype = {
	defaults: {
		filter: "", // recent, products, search
		search: ""
	},
	
	filters: [{
		text: "Recent",
		value: "recent",
		href: "user/pages/recent"
	}, {
		text: "Products",
		value: "products",
		href: "user/pages/products"
	}]
};


pageAdmin.model("pageAdminViewModel", [
	"attrs",
	"options",
pageAdminViewModel]);