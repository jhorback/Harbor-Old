/*
 * pageAdminViewModel
 *     .pagerModel
 *     .pages
 */
function pageAdminViewModelRepo(_, modelFactory, currentUserRepo, pageRepo) {
	var currentUser, viewModel;

	currentUser = currentUserRepo.getCurrentUser();
	
	viewModel = modelFactory.create("pageAdminViewModel", {}, {
		pagerModel: modelFactory.create("pagerModel", { take: 20 }),
		pages: pageRepo.createPages()
	});
		
	
	viewModel.on("change:filter", changeFilter);	
	viewModel.on("change:search", changeSearch);
	updatePages = _.debounce(updatePages);
	viewModel.set("filter", "recent");

	return {
		getViewModel: function () {
			return viewModel;
		},
		
		updatePages: function () {
			updatePages();
		}
	};
	
	function changeFilter() {
		var filter = viewModel.get("filter");
		if (filter !== "search") {
			this.set("search", "");
		}
		viewModel.pagerModel.first();
		updatePages();
	}
	
	function changeSearch() {
		var filter = viewModel.get("filter");
		if (filter === "search") {
			updatePages();
		}
	}
	
	function updatePages() {
		pageRepo.fetchPages(viewModel.pages, viewModel.pagerModel.extend({
			author: currentUser.get("username"),
			orderDesc: "modified",
			filter: viewModel.get("filter"),
			search: viewModel.get("search")
		}));
	}
}



pageAdmin.service("pageAdminViewModelRepo", [
	"_",
	"modelFactory",
	"currentUserRepo",
	"pageRepo",
	pageAdminViewModelRepo
]);
