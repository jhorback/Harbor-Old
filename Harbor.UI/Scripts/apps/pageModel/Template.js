

/*
header, content, and aside components have a uicid, key.
content has a classNames property.
*/
pageModel.Template = Application.Model.extend({
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

	getNextUICID: function () {
		var cc = this.get("componentCounter");
		this.set("componentCounter", cc + 1);
		return "pc-" + this.get("pageID") + "-" + cc;
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
});