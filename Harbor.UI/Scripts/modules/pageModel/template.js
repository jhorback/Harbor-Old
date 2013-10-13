

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
		layoutIsReadable: false,
		layoutHasNoSidebar: false,
		header: null,
		content: [],
		aside: [],
		componentCounter: 0,
		//
		layout: "stretch", // stretch, centered, leftaligned
		showSidebar: true
	},
	
	initialize: function () {
		var attrs = this.attributes,
			layout = "stretch";
		
		this.set("showSidebar", !attrs.layoutHasNoSidebar);
		if (attrs.layoutIsCentered) {
			layout = "centered";
		} else if (attrs.layoutIsReadable) {
			layout = "leftaligned";
		}
		this.set("layout", layout);


		this.header = this.modelFactory.createGeneric(attrs.header);
		this.aside = this.collectionFactory.createGeneric(attrs.aside);
		this.content = this.collectionFactory.createGeneric(attrs.content);
	},

	"[layoutIsCentered]": {
		get: function (value) {
			return this.get("layout") === "centered";
		},
		bind: ["layout"]
	},
	
	"[layoutIsReadable]": {
		get: function (value) {
			var layout = this.get("layout");
			return layout === "centered" || layout === "leftaligned";
		},
		bind: ["layout"]
	},
	
	"[layoutHasNoSidebar]": {
		get: function () {
			return !this.get("showSidebar");
		},
		bind: ["showSidebar"]
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
