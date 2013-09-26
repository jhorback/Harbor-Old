

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

	addContent: function (type, key) {
		var ret,
			uicid = this.getNextUICID(),
			content = {
				type: type,
				key: key,
				uicid: uicid,
				id: uicid
			};
		
		if (type === "header") {
			this.header.set("key", key);
			ret = this.header;
		} else if (type === "aside") {
			this.aside.push(content);
			ret = this.aside.get(uicid);
		} else {
			content.classNames = ["col1"];
			this.content.push(content);
			ret = this.content.get(uicid);
		}
		return ret;
	},

	getNextUICID: function () {
		var cc = this.get("componentCounter") + 1;
		this.set("componentCounter", cc);
		return "pc-" + this.get("pageID") + "-" + cc;
	}
};


pageModel.model("template", [
	"attrs", "options", "collectionFactory", "modelFactory",
	pageModel.template = template]);
