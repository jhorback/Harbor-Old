

pageModel.linksSectionCollection = {
	model: "linksSectionModel",

	initialize: function (models, options) {
		this.page = options.page;
	},

	comparator: function (model) {
		var node = $("[data-cid=" + model.cid + "]");
		var index = node.index();
		if (index === -1) {
			index = 1000;
		}
		return index;
	}
};


pageModel.collection("linksSectionCollection",
	pageModel.linksSectionCollection
);
