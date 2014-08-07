

pageModel.linkSectionLinkCollection = {
	model: "linkSectionLinkModel",
	comparator: function (model) {
		var node = $("#" + model.cid);
		var index = node.index();
		return index;
	}
};


pageModel.collection("linkSectionLinkCollection",
	pageModel.linkSectionLinkCollection
);

