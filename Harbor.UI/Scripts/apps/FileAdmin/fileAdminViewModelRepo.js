/*
 * fileAdminViewModel
 *     .pagerModel
 *     .albums
 */
function fileAdminViewModelRepo(_, modelFactory, fileAdminRepo) {
	var viewModel;

	viewModel = modelFactory.create("fileAdminViewModel", {}, {
		pagerModel: modelFactory.create("pagerModel", { take: 5 }),
		albums: fileAdminRepo.getAlbums()
	});

	
	viewModel.on("change:filter", changeFilter);	
	viewModel.on("change:search", changeSearch);
	updateAlbums = _.debounce(updateAlbums);
	viewModel.set("filter", "recent");

	return {
		getViewModel: function () {
			return viewModel;
		},
		
		updateAlbums: function () {
			updateAlbums();
		}
	};
	
	function changeFilter() {
		var filter = viewModel.get("filter");
		if (filter !== "search") {
			this.set("search", "");
		}
		viewModel.pagerModel.first();
		updateAlbums();
	}
	
	function changeSearch() {
		var filter = viewModel.get("filter");
		if (filter === "search") {
			updateAlbums();
		}
	}
	
	function updateAlbums() {
		fileAdminRepo.fetchAlbums(viewModel.albums, viewModel.pagerModel.extend({
			orderDesc: "modified",
			filter: viewModel.get("filter"),
			search: viewModel.get("search")
		}));
	}
}



fileAdmin.service("fileAdminViewModelRepo", [
	"_",
	"modelFactory",
	"fileAdminRepo",
	fileAdminViewModelRepo
]);
