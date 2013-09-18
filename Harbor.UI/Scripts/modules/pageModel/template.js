

/*
header, content, and aside components have a uicid, key.
content has a classNames property.
*/
function template() {
	
}

template.prototype = {
	defaults: {
		pageID: null,
		pageTypeKey: null,
		layoutIsCentered: false,
		layoutIsCenteredDisabled: true,
		layoutIsReadable: false,
		layoutHasNoSidebar: false,
		header: null,
		content: [],
		aside: [],
		componentCounter: 0
	},

	initialize: function () {
		this.on("change", function () {
			console.log("changed", arguments);
		});
		this.set("pageID", "foo");
	},

	layoutIsCenteredDisabled: {
		get: function (value) {
			return !this.get("layoutIsReadable");
		},

		bind: "layoutIsReadable"
	},

	layoutIsCentered: {
		get: function (value) {
			if (this.get("layoutIsReadable") === false) {
				return false;
			}
			return value;
		},
		bind: "layoutIsReadable"
	},

	addContent: function (key) {
		var content = this.get("content");
		content.push({
			key: key,
			classNames: ["col1"],
			uicid: this.getNextUICID()
		});
	},

	getNextUICID: function () {
		var cc = this.get("componentCounter") + 1;
		this.set("componentCounter", cc);
		return "pc-" + this.get("pageID") + "-" + cc;
	}
};


pageModel.model("template", [pageModel.template = template]);
