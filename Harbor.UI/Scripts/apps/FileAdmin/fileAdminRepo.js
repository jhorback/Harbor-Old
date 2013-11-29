
fileAdmin.fileAdminRepo = function (fileRepo, modelFactory) {

	var albums;

	return {
		getAlbums: function () {
			if (!albums) {
				albums = fileRepo.getAlbums();
			}
			return albums;
		},

		fetchAlbums: function (data) {
			var albums = this.getAlbumns();
			
			fileRepo.fetchFiles(albums.groupSource, data).then(triggerAlbumSync(albums));
		},

		getFile: function (id) {
			var dfd = $.Deferred();
			
			if (!albums) {
				albums = this.getAlbums();
			}
			
			albums.groupSource.load.then(function () {

				var file = albums.groupSource.find(function (f) {
					return f.get("id") === id;
				});

				dfd.resolve(file);
			});

			return dfd;
		}
	};

	
	function triggerAlbumSync(albums) {
		return function () {
			albums.totalCount = albumns.groupSource.totalCount;
			albums.trigger("sync");
		};
	}
};


fileAdmin.service("fileAdminRepo", ["fileRepo", "modelFactory", fileAdmin.fileAdminRepo]);