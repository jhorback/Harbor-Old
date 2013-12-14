﻿/*
 * fileAdminViewModel
 *     .pagerModel
 *     .albums
 */
function fileAdminViewModelRepo(_, modelFactory, fileRepo) {
	var viewModel;

	viewModel = modelFactory.create("fileAdminViewModel", {}, {
		pagerModel: modelFactory.create("pagerModel", { take: 5 }),
		albums: fileRepo.createAlbums()
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
		var albums, data;
		
		albums = viewModel.albums;
		data = viewModel.pagerModel.extend({
			orderDesc: "modified",
			filter: viewModel.get("filter"),
			search: viewModel.get("search")
		});
		
		fileRepo.fetchFiles(albums.groupSource, data).then(triggerAlbumSync(albums));
	}
	
	function triggerAlbumSync(albums) {
		return function () {
			albums.totalCount = albums.groupSource.totalCount;
			albums.trigger("sync");
		};
	}
}



fileAdmin.service("fileAdminViewModelRepo", [
	"_",
	"modelFactory",
	"fileRepo",
	fileAdminViewModelRepo
]);