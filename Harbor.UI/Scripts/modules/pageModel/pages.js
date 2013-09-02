

function pages(models, options, appurl) {
	this.url = appurl.get("api/pages");
}

pages.prototype = {
	model: "page",

	search: function (title) {
		var pattern;

		if (title === "") {
			return this;
		}

		pattern = new RegExp(title, "gi");
		return _(this.filter(function (data) {
			return pattern.test(data.get("title"));
		}));
	}
};

pageModel.collection("pages", ["models", "options", "appurl", pageModel.pages = pages]);
