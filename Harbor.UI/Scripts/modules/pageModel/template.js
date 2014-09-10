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
		defaultContentClassName: "col1"
	},
	
	initialize: function () {
		var models = this.getModelsFromContent();
		this.content = this.collectionFactory.createGeneric(models);
	},

	createModel: function (meta) {
		var uicid = meta.id;
		var data = _.extend(meta, this.attributes.contentData[meta.id]);
		data.uicid = uicid;
		try {
			return this.modelFactory.create(meta.key + "Model", data, { page: this.page });
		} catch (e) {
			// keep this catch here for now
			// may want to do something else when viewing things like the "Pages" list
			return data;
		}
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
	}
};


pageModel.model("template", [
	"attrs",
	"options",
	"collectionFactory",
	"modelFactory",
	pageModel.template = template
]);
