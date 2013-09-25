

/*
header, content, and aside components have a uicid, key.
content has a classNames property.
*/
function template(attrs, options, collectionFactory, modelFactory) {
	
	this.collectionFactory = collectionFactory;
	this.modelFactory = modelFactory;
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
		
		this.header = this.modelFactory.createGeneric(this.attributes.header);
		this.aside = this.collectionFactory.createGeneric(this.attributes.aside);
		this.content = this.collectionFactory.createGeneric(this.attributes.content);
	},

	"[layoutIsCenteredDisabled]": {
		get: function (value) {
			return !this.get("layoutIsReadable");
		},
		bind: "layoutIsReadable"
	},

	"[layoutIsCentered]": {
		get: function (value) {
			if (this.get("layoutIsReadable") === false) {
				return false;
			}
			return value;
		},
		bind: "layoutIsReadable"
	},

	"[header]": {
		get: function () {
			return this.header.toJSON();
		}
	},
	
	"[aside]": {
		get: function () {
			return this.aside.toJSON();
		}
	},
	
	"[content]": {
		get: function () {
			return this.content.toJSON();
		}
	},

	//addContent: function (key) {
	//	var content = this.get("content");
	//	content.push({
	//		key: key,
	//		classNames: ["col1"],
	//		uicid: this.getNextUICID()
	//	});
	//},

	getNextUICID: function () {
		var cc = this.get("componentCounter") + 1;
		this.set("componentCounter", cc);
		return "pc-" + this.get("pageID") + "-" + cc;
	}
};


pageModel.model("template", [
	"attrs", "options", "collectionFactory", "modelFactory",
	pageModel.template = template]);
