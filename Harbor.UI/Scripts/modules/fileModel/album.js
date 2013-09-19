
fileModel.album = function (attrs, options, slugify) {
	this.slugify = slugify;
};


fileModel.album.prototype = {
	defaults: {
		name: null,
		models: null,
		uploadId: null
	},

	uploadId: {
		get: function () {
			return this.slugify(this.get("name"));
		}
	}
};


fileModel.model("album", ["attrs", "options", "slugify", fileModel.album]);