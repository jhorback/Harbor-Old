

pageModel.linkSectionLinkCollection = {
	model: "linkSectionLinkModel",
	comparator: function (model) {
		var node = $("#" + model.cid);
		var index = node.index();
		return index === -1 ? 100 : index;
	}
};


pageModel.collection("linkSectionLinkCollection",
	pageModel.linkSectionLinkCollection
);

