

fileModel.fileRepo = function (collectionFactory, ajaxRequest) {

	return {
		getFiles: function (data) {
			var files = collectionFactory.create("files");
			ajaxRequest.handle(files.fetch({ data: data }));
			return files;
		},

		getAlbums: function (data) {
			//sortByAlbum
			this.getFiles(data).then(function (files) {
				// keep the source models in sync
			this.on("all", function (event, model) {
				if (!this._sync && (event === "add" || event === "remove")) {
					this.source[event](model);
				}
			}, this);
			});
		}
	};
};



fileModel.albums = function () {

};

fileModel.albums.prototype = {

};




fileModel.service("fileRepo", ["collectionFactory", "ajaxRequest", fileModel.fileRepo]);