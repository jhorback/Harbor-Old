

fileModel.fileRepo = function (_, $, collectionFactory, ajaxRequest, modelFactory) {

	return {
		createFiles: function () {
			return collectionFactory.create("files");
		},
		
		fetchFiles: function (files, data) {
			return ajaxRequest.handle(files.fetch({ data: data }));
		},
		
		fetchFile: function (fileID) {
			var dfd = $.Deferred();
			
			var file = modelFactory.create("file", {
				id: fileID
			});
			
			ajaxRequest.handle(file.fetch()).then(function () {
				dfd.resolve(file);
			});
			
			return dfd;
		},
		
		getFiles: function (data, pageData) {
			var files = this.createFiles();
			
			data = data || {};
			pageData = pageData || { orderDesc: "modified"};
			
			files.load = this.fetchFiles(files, _.extend(data, pageData));
			return files;
		},

		createAlbums: function () {
			var albums = collectionFactory.create("albums", null, {				
				groupSource: this.createFiles(),
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
	"$",
	"collectionFactory",
	"ajaxRequest",
	"modelFactory",
	fileModel.fileRepo
]);