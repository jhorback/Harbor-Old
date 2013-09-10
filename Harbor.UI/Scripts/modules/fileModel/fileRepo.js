

fileModel.fileRepo = function (collectionFactory, ajaxRequest) {

	return {
		getFiles: function (data) {
			var files = collectionFactory.create("files");
			ajaxRequest.handle(files.fetch({ data: data }));
			return files;
		}
	};
};



fileModel.service("fileRepo", ["collectionFactory", "ajaxRequest", fileModel.fileRepo]);