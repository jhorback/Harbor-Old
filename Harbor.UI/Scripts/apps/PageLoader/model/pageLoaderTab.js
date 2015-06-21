
pageLoader.pageLoaderTab = {
	defaults: {
		id: null,
		text: null,
		selected: false,
		//
		className: ""
	},
	"[className]": {
		get: function () {
			return this.attributes.selected ? "selected" : "";
		},
		observe: ["selected"]
	}
};

pageLoader.model("pageLoaderTab", pageLoader.pageLoaderTab);