/*
content comopnent : {
	uicid:, key:, classNames:
}
*/
function template(attrs, options, collectionFactory, modelFactory, console) {

	this.page = options.page;
	this.collectionFactory = collectionFactory;
	this.modelFactory = modelFactory;
	this.console = console;
}

template.prototype = {
	defaults: {
		pageID: null,
		content: [],
		contentData: {},
		defaultContentClassName: "col1",
		prependContentByDefault: false
	},
	
	initialize: function () {
		var models = this.getModelsFromContent();
		this.content = this.collectionFactory.createGeneric(models);

		this.listenTo(this.page, "sync", this.onPageSync);
	},

	createModel: function (meta) {
		var uicid = meta.id;
		var data = _.extend(meta, this.attributes.contentData[meta.id]);
		data.uicid = uicid;
		try {			
			return this.modelFactory.create(meta.key + "Model", data, { page: this.page });
		} catch (e) {
			// keep this catch here for now
			// A separate light weight collection would work best for page lists.
			this.console.warn("Cannot create component model.");
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

	onPageSync: function () {
		var models = this.getModelsFromContent();
		this.content.set(models);
	},
	
	"[content]": {
		get: function () {
			return this.content && this.content.toJSON();
		}
	}
};


pageModel.model("template", [
	"attrs",
	"options",
	"collectionFactory",
	"modelFactory",
	"console",
	pageModel.template = template
]);
