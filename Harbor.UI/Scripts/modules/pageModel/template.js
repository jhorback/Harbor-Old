/*
content comopnent : {
	uicid:, key:, classNames:
}
*/
function template(attrs, options, collectionFactory, modelFactory) {
	
	this.collectionFactory = collectionFactory;
	this.modelFactory = modelFactory;
}

template.prototype = {
	defaults: {
		pageID: null,
		content: [],
		defaultContentClassName: "col1",
		componentCounter: 0,
		showSidebar: true
	},
	
	initialize: function () {
		this.content = this.collectionFactory.createGeneric(attrs.content);
	},
	
	"[content]": {
		get: function () {
			return this.content.toJSON();
		}
	},

	// jch! - don't really need type here since only "content" is supported now
	addContent: function (type, key) {
		var ret,
			uicid = this.getNextUICID(),
			content = {
				type: type,
				key: key,
				uicid: uicid,
				id: uicid
			};
		
		content.classNames = [this.attributes.defaultContentClassName];
		this.content.push(content);
		ret = this.content.get(uicid);
		return ret;
	},

	getNextUICID: function () {
		var cc = this.get("componentCounter") + 1;
		this.set("componentCounter", cc);
		return "pc-" + this.get("pageID") + "-" + cc;
	}
};


pageModel.model("template", [
	"attrs",
	"options",
	"collectionFactory",
	"modelFactory",
	pageModel.template = template
]);
