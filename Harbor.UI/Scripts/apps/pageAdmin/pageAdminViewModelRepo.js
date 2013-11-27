/*
 * pageAdminViewModel
 *     .pagerModel
 *     .pages
 */
function pageAdminViewModelRepo(modelFactory, currentUser, pageRepo) {
	var pagerModel, viewModel;

	pagerModel = modelFactory.create("pagerModel", {
		take: 5
	});
	
	viewModel = modelFactory.create("pageAdminViewModel", {}, {
		pagerModel: pagerModel
	});
		
	viewModel.pages = pageRepo.createPages();
	

	return {
		getViewModel: function () {
			return viewModel;
		},
		
		updatePages: function () {
			pageRepo.fetchPages(viewModel.pages, viewModel.pagerModel.extend({
				author: currentUser.get("username"),
				orderDesc: "modified"
			}));
		}
	};
}



pageAdmin.service("pageAdminViewModelRepo", [
	"modelFactory",
	"currentUser",
	"pageRepo",
	pageAdminViewModelRepo
]);
