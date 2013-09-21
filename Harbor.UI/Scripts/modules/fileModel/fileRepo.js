

fileModel.fileRepo = function (collectionFactory, ajaxRequest) {

	return {
		createFiles: function () {
			return collectionFactory.create("files");
		},
		
		fetchFiles: function (files, data) {
			return ajaxRequest.handle(files.fetch({ data: data }));
		},
		
		getFiles: function (data) {
			var files = this.createFiles();
			files.load = this.fetchFiles(files, data);
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