

session.menuItem = {
	defaults: {
		//
		selected: false,
		className: "",
		showMenuIcon: false
	},
	"[className]": {
		get: function () {
			var attrs = this.attributes;
			// return attrs.isMenu ? "loud" : attrs.selected ? "selected" : "";
			return attrs.selected ? "selected" : "";
		},
		observe: "selected"
	},
	"[showMenuIcon]": {
		get: function () {
			var attrs = this.attributes;
			return attrs.isMenu && attrs.selected === false;
		},
		observe: "selected"
	}
};
session.model("menuItem", session.menuItem);