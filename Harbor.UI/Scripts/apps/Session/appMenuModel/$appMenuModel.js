

session.appMenuModel = function (
	attrs,
	options,
	currentUserRepo,
	appMenuDto
) {
	this.currentUserRepo = currentUserRepo;
	this.appMenuDto = appMenuDto;
};

session.appMenuModel.prototype = {
	defaults: {
		"selectedMenuItemId": null
	},
	
	initialize: function () {
		this.currentUser = this.currentUserRepo.getCurrentUser();
		this.initSelectedMenuItemId();
		this.onMenuChange();
	},

	associations: {
		"menuItems": {
			type: "collection",
			name: "menuItemCollection",
			initialize: function () {
				this.set(this.root.appMenuDto);
			}
		},

		"parentItems": {
			type: "collection",
			name: "menuItemCollection"
		},

		"childItems": {
			type: "collection",
			name: "menuItemCollection"
		}
	},

	events: {
		"changeMenu": "onMenuChange"
	},

	sortItems: function (item) {
		return item.attributes.order;
	},

	initSelectedMenuItemId: function () {
		var currentUrl = document.location.toString().toLowerCase(),
			currentItem;

		if (this.attributes.selectedMenuItemId !== null) {
			return;
		}

		currentItem = this.menuItems.find(function (item) {
			var attrs = item.attributes;
			return attrs.url && currentUrl.indexOf(attrs.url.toLowerCase()) > -1;
		});

		if (currentItem) {
			this.set("selectedMenuItemId", currentItem.id);
			currentItem.set("selected", true);
		}
	},

	onMenuChange: function (menu) {
		this.parentItems.set(this.getParentItems());
		this.childItems.set(this.getChildItems());
	},

	getParentItems: function () {
		var parents = [],
			nextId = this.attributes.selectedMenuItemId,
			currentItem = this.menuItems.get(nextId),
			nextItem;

		if (nextId == null) {
			return [this.menuItems.get("rootMenu")]; // we are on the root
		}

		while (nextId !== null) {
			nextItem = this.menuItems.get(nextId);
			parents.push(nextItem);
			nextId = nextItem.attributes.parentId;
		}

		if (currentItem && currentItem.attributes.isMenu == false) {
			parents.shift(); // remove the current item
		}
		return parents;
	},

	getChildItems: function () {
		var lastParent = this.parentItems.last(),
			parentItemId = lastParent ? lastParent.id : null,
			children = [];

		if (parentItemId == null) {
			debugger;
			return children;
		}

		this.menuItems.each(function (item) {
			if (item.attributes.parentId === parentItemId) {
				children.push(item);
			}
		});

		return children;
	}
};

session.model("appMenuModel", [
	"attrs",
	"options",
	"currentUserRepo",
	"appMenuDto",
	session.appMenuModel
]);


session.menuItem = {
	defaults: {
		selected: false,
		className: ""
	},
	"[className]": {
		get: function () {
			return this.attributes.selected ? "selected" : "";
		},
		observe: "className"
	}
};
session.model("menuItem", session.menuItem);

session.menuItemCollection = {
	model: "menuItem",
	comparator: function (item) {
		return item.attributes.order;
	}
};
session.collection("menuItemCollection", session.menuItemCollection);