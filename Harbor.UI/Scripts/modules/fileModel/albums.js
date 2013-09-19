

fileModel.albums = {
	model: "album",

	comparator: function (album) {
		// the album name is a date
		return new Date(album.get("name")).getTime() * -1;
	},

	groupBy: function (file) {
		return file.get("album");
	}
};


fileModel.collection("albums", fileModel.albums);