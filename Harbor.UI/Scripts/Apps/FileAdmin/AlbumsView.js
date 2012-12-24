﻿FileAdmin.AlbumsView = Application.View.extend({
	initialize: function () {

		_.bindAll(this, "renderAlbum", "renderFile");
	},
	
	render: function () {

		var albums = this.collection.groupBy(function (file) {
			return file.get("album");
		});

		_.each(albums, this.renderAlbum);
		return this;
	},
	
	renderAlbum: function (album) {
		var thisView = this;
		var albumName = album[0].get("album") || "untitled";

		var albumEl = this.template("FileAdmin-Album")({ album: albumName, uploadId: FileAdmin.slugify(albumName) });
		albumEl = $(albumEl);
		this.$el.append(albumEl);
		_.each(album, function (file) {
			thisView.renderFile(albumEl.find("[data-rel=files]"), file);
		});
	},
	
	renderFile: function (fileList, file) {
		var fileEl = this.template("FileAdmin-File")(file.toJSON());
		fileList.append(fileEl);
	}
});