

fileModel.fileRepo = function (_, collectionFactory, ajaxRequest) {

	return {
		createFiles: function () {
			return collectionFactory.create("files");
		},
		
		fetchFiles: function (files, data) {
			return ajaxRequest.handle(files.fetch({ data: data }));
		},
		
		getFiles: function (data, pageData) {
			var files = this.createFiles();
			
			data = data || {};
			pageData = pageData || { orderDesc: "modified"};
			
			files.load = this.fetchFiles(files, _.extend(data, pageData));
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
		},
		
		deleteFile: function (file, handler, proxy) {
			return ajaxRequest.handle(file.destroy(), handler, proxy);
		}
	};
};


fileModel.service("fileRepo", [
	"_",
	"collectionFactory",
	"ajaxRequest",
	"ajaxRequest",
	fileModel.fileRepo
]);