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
		contentData: {},
		defaultContentClassName: "col1",
		componentCounter: 0,
		showSidebar: true
	},
	
	initialize: function () {
		var models = this.getModelsFromContent();
		this.content = this.collectionFactory.createGeneric(models);
	},

	createModel: function (meta) {
		var uicid = meta.id;
		var data = _.extend(meta, this.attributes.contentData[meta.id]);
		data.uicid = uicid;
		return this.modelFactory.create(meta.key + "Model", data, { page: this.page });
		
	},

	getModelsFromContent: function () {
		var models = [];
		_.each(this.attributes.content, function (meta) {
			models.push(this.createModel(meta));	
		}, this);
		return models;
	},
	
	"[content]": {
		get: function () {
			return this.content && this.content.toJSON();
		}
	},

	"[contentData]": {
		set: function (value) {
			var models;
			if (this.content) {
				// need to set the attributes firts
				this.attributes.contentData = value;
				models = this.getModelsFromContent(value);
				this.content.set(models);
			}
			return value;
		}
	},
	

	addContent: function (key) {
		var ret,
			uicid = this.getNextUICID(),
			content = {
				type: "content",
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
