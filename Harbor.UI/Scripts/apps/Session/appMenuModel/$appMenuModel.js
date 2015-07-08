

session.appMenuModel = function (
	attrs,
	options,
	appMenuDto
) {
	this.appMenuDto = appMenuDto; // 
};

session.appMenuModel.prototype = {
	associations: {
		"menuItems": {
			model: "menuItems",
			initialize: function () {
				debugger;
				this.set(this.root.options.appMenuDto);
			}
		},

		"parents": {
			model: "menuItems"
		},

		"children": {
			model: "menuItems"
		}
	}
};

session.model("appMenuModel", [
	"attrs",
	"options",
	appMenuDto,
	session.appMenuModel
])