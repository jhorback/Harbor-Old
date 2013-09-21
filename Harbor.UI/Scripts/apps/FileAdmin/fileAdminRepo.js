
fileAdmin.fileAdminRepo = function (fileRepo, modelFactory) {

	var albums;

	return {
		getAlbums: function () {
			if (!albums) {
				albums = fileRepo.getAlbums();
			}
			return albums;
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
		},
	};
};


fileAdmin.service("fileAdminRepo", ["fileRepo", "modelFactory", fileAdmin.fileAdminRepo]);