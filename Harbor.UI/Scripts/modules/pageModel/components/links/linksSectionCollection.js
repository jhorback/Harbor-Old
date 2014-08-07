

pageModel.linksSectionCollection = {
	model: "linksSectionModel",
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
