

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
		this.parentItems.set(this.getParentItems());
		this.childItems.set(this.getChildItems());
	},

	associations: {
		"menuItems": {
			// model: "menuItems",
			type: "collection",
			initialize: function () {
				this.setSort(this.root.sortItems); // jch* may want a first class collection for this
				this.set(this.root.appMenuDto);
			}
		},

		"parentItems": {
			//model: "menuItems",
			type: "collection",
			initialize: function () {
				this.setSort(this.root.sortItems);
			}
		},

		"childItems": {
			//model: "menuItems",
			type: "collection",
			initialize: function () {
				this.setSort(this.root.sortItems);
			}
		}
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

	getParentItems: function () {
		var parents = [],
			nextId = this.attributes.selectedMenuItemId,
			nextItem;

		if (nextId == null) {
			return [this.menuItems.get("rootMenu")]; // we are on the root
		}

		while (nextId !== null) {
			nextItem = this.menuItems.get(nextId);
			parents.push(nextItem);
			nextId = nextItem.attributes.parentId;
		}

		parents.shift(); // remove the current item
		return parents;
	},

	getChildItems: function () {
		var parentItem = this.parentItems.last();

		// jch! - here - finding the child items
		console.debug("parentItemId", parentItem && parentItem.id);

		return [];
	}
};

session.model("appMenuModel", [
	"attrs",
	"options",
	"currentUserRepo",
	"appMenuDto",
	session.appMenuModel
])