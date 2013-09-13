

fileModel.files = function (models, options, appurl) {
	
	this.url = appurl.get("api/files");
};


fileModel.files.prototype = {
	model: "file"
};


fileModel.collection("files", ["models", "options", "appurl", fileModel.files]);
