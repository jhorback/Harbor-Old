

function pageAdminRouter(appurl) {
	this.root = appurl.get("user/pages/");
}


pageAdminRouter.prototype = {
	routes: {
		"recent": "recent",
		"products": "products",
		"search/:search": "search"
	},
	
	initialize: function () {
		alert("initialize router");
	},
	
	recent: function () {
		alert("recent");
	},
	
	products: function () {
		alert("products");
	},
	
	search: function (search) {
		alert("search " + search);
	}
};


pageAdmin.router("pageAdminRouter", [
	"appurl",
	pageAdminRouter
]);