

fileModel.files = function (models, options, appurl) {
	
	this.url = appurl.get("api/files");
};


fileModel.files.prototype = {
	model: "file",
	
	search: function (title) {
		var pattern;

		if (title === "") {
			return this;
		}

		pattern = new RegExp(title, "gi");
		return _(this.filter(function (data) {
			return pattern.test(data.get("name"));
		}));
	}
};


fileModel.collection("files", ["models", "options", "appurl", fileModel.files]);
