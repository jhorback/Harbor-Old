

fileModel.files = function (models, options, appurl) {
	
	this.url = appurl.get("api/files");
};


fileModel.files.prototype = {
	model: "file",
	
	search: function (name) {
		var pattern;

		if (name === "") {
			this.clearFilter();
		}

		pattern = new RegExp(name, "gi");
		this.setFilter(function (model) {
			return pattern.test(model.get("name"));
		});
	}
};


fileModel.collection("files", ["models", "options", "appurl", fileModel.files]);
