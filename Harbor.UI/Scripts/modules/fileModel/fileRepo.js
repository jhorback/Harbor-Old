

fileModel.fileRepo = function (collectionFactory, ajaxRequest) {

	return {
		getFiles: function (data) {
			var files = collectionFactory.create("files");
			ajaxRequest.handle(files.fetch({ data: data }));
			return files;
		},

		getAlbums: function (data) {
			var albums = collectionFactory.create("albums", null, {				
				groupSource: this.getFiles(data),
			});

			return albums;
		}
	};
};


fileModel.service("fileRepo", ["collectionFactory", "ajaxRequest", fileModel.fileRepo]);