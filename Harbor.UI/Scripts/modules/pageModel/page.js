


function page(attrs, options, modelFactory, appurl, pageurl) {
	this.modelFactory = modelFactory;
	this.urlRoot = appurl.get("api/pages");
	this.pageurl = pageurl;
}

page.prototype = {

	template: null, // pageModel.template

	previewImage: null, // fileModel.file

	defaults: {
		id: null,
		title: null,
		titleBackgroundUrl: null,
		author: null,
		pageTypeKey: "document",
		pageTypeName: null,
		created: null,
		modified: null,
		enabled: true,
		published: true,
		pageLayoutId: null,
		template: null,
		layout: null,
		properties: [],
		previewImageID: null,
		previewImage: null, // FileDto
		previewText: "",
		autoPreviewText: true,
		autoPreviewImage: true,
		isARootPage: null,
		rootPageUrl: null,
		//
		thumbUrl: "",
		link: null,
		publishedDisplay: null,
		publishedMessage: null,
		isLayoutTitleDifferent: false,
		parentPageUrl: null,
		hasTitleBackgroundUrl: false
	},

	initialize: function () {
		this.setPreviewFn = _.bind(this.setPreviewFn, this);

		this.set("link", this.getUrl());
		this.template = this.modelFactory.create("template", this.attributes.template, { page: this, root: this });
		this.layout = this.modelFactory.create("pageLayout", this.attributes.layout, { page: this, root: this });

		this.on("change:previewImage", this.setPreviewFn);
		this.setPreviewFn();
	},

	setPreviewFn: function () {
		var attrs = this.attributes;
		if (attrs.previewImage) {
			// just trying the plain model here to remove the dependency on fileModel
			this.previewImage = this.modelFactory.create("model", attrs.previewImage);
			// this.previewImage = new FileModel(this.attributes.previewImage);
		} else {
			this.previewImage = null;
		}
	},

	"[title]": {
		validate: {
			required: true
		}
	},

	"[template]": {
		get: function () {
			return this.template && this.template.toJSON();
		},
		set: function (value) {
			this.template && this.template.set(value);
			return value;
		}
	},

	"[layout]": {
		get: function () {
			return this.layout && this.layout.toJSON();
		},

		set: function (value) {
			this.layout && this.layout.set(value);
			return value;
		}
	},

	"[publishedDisplay]": {
		get: function () {
			return this.get("published") ? "Published" : "Private";
		},

		bind: "published"
	},

	"[publishedMessage]": {
		get: function () {
			return this.get("published") ?
				"Everyone can see this page." :
				"Only you can see this page.";
		},

		bind: ["published"]
	},

	"[thumbUrl]": {
		get: function () {
			return this.previewImage && this.previewImage.get("thumbUrl");
		}
	},
	
	"[isLayoutTitleDifferent]": {
		get: function () {
			return this.id !== this.layout.attributes.parentPageId;
		}
	},

	"[parentPageUrl]": {
		get: function () {
			var parentId = this.layout.attributes.parentPageId;
			return parentId ? this.pageurl.get(parentId, this.layout.attributes.title) :
				null;
		}
	},

	"[hasTitleBackgroundUrl]": {
		get: function () {
			return this.attributes.titleBackgroundUrl ? true : false;
		},
		observe: ["titleBackgroundUrl"]
	},

	getUrl: function () {
		return this.pageurl.get(this.get("id"), this.get("title"));
	},

	getProperty: function (name) {
		var props = this.get("properties");
		var prop = _.find(props, function (item) {
			return item.name === name;
		});
		return prop ? prop.value : null;
	},

	setProperty: function (name, value) {
		var props, prop;

		props = this.get("properties");
		prop = _.find(props, function (item) {
			return item.name === name;
		});
		if (prop) {
			prop.value = value;
		} else {
			props.push({
				name: name,
				value: value
			});
		}

		this.set("properties", props);
	}
};


pageModel.model("page", ["attrs", "options", "modelFactory", "appurl", "pageurl", page]);
