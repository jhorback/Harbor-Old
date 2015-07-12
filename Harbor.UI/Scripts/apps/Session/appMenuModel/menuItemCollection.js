

session.menuItemCollection = {
	model: "menuItem",
	comparator: function (item) {
		return item.attributes.order;
	}
};

session.collection("menuItemCollection", session.menuItemCollection);
