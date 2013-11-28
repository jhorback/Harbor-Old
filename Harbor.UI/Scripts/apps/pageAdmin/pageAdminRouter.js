

function pageAdminRouter(appurl, pageAdminViewModelRepo) {
	this.root = appurl.get("user/pages/");
	this.model = pageAdminViewModelRepo.getViewModel();
}


pageAdminRouter.prototype = {
	routes: {
		"recent": "recent",
		"products": "products",
		"search/:search": "search"
	},

	recent: function () {
		this.model.set("filter", "recent");
		this.navigate("recent");
	},
	
	products: function () {
		this.model.set("filter", "products");
		this.navigate("products");
	},
	
	search: function (search) {
		this.model.set({
			"filter": "search",
			"search": search
		});
		this.navigate("search/" + search);
	}
};


pageAdmin.router("pageAdminRouter", [
	"appurl",
	"pageAdminViewModelRepo",
	pageAdminRouter
]);