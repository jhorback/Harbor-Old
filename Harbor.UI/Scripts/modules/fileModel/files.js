

fileModel.files = function (models, options, appurl) {
	
	this.url = appurl.get("api/files");
};


fileModel.files.prototype = {
	model: "file",

	comparator: function (model) {
		return model.get("uploaded");
	},
	
	search: function (name) {
		var pattern;

		if (name === "") {
			this.clearFilter();
		}

		this.setFilter(function (model) {
			var matches = new RegExp(name, "gi").test(model.get("name"));
			return matches;
		});
	}
};


fileModel.collection("files", ["models", "options", "appurl", fileModel.files]);
