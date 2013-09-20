
fileAdmin.fileAdminRepo = function (fileRepo) {

	var albums;

	return {
		getAlbums: function () {
			if (!albums) {
				albums = fileRepo.getAlbums();
			}
			return albums;
		},

		getFile: function (id) {
			var file;
			if (!albums) {
				return;
			}

			file = albums.groupSource.find(function (f) {
				return f.get("id") === id;
			});

			return file;
		},
	};
};

fileAdmin.service("fileAdminRepo", ["fileRepo", fileAdmin.fileAdminRepo]);