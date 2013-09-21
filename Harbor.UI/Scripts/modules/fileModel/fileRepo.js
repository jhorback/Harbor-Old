

fileModel.fileRepo = function (collectionFactory, ajaxRequest) {

	return {
		getFiles: function (data) {
			var files = collectionFactory.create("files");
			files.load = ajaxRequest.handle(files.fetch({ data: data }));
			return files;
		},

		getAlbums: function (data) {
			var albums = collectionFactory.create("albums", null, {				
				groupSource: this.getFiles(data),
			});

			return albums;
		},

		saveFile: function (file, handler, proxy) {
			return ajaxRequest.handle(file.save(), handler, proxy);
		}
	};
};


fileModel.service("fileRepo", [
	"collectionFactory", "ajaxRequest", "ajaxRequest",
	fileModel.fileRepo]);