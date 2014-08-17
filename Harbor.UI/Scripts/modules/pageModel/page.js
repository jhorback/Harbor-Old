


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
		autoPreview: true,
		files: [],
		pageLinks: [],
		navLinks: [],
		payPalButtons: [],
		//
		thumbUrl: "",
		link: null,
		publishedDisplay: null,
		publishedMessage: null
	},

	initialize: function () {
		var page = this, setPreviewFn;

		setPreviewFn = _.bind(function () {
			if (this.attributes.previewImage) {
				// just trying the plain model here to remove the dependency on fileModel
				this.previewImage = this.modelFactory.create("model", this.attributes.previewImage);
				// this.previewImage = new FileModel(this.attributes.previewImage);
			} else {
				this.previewImage = null;
			}
		}, this);

		this.set("link", this.getUrl());
		this.template = this.modelFactory.create("template", this.attributes.template, { page: this });
		this.layout = this.modelFactory.create("pageLayout", this.attributes.layout, { page: this });
		
		setPreviewFn();
		this.on("change:previewImage", setPreviewFn);
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

	"[autoPreview]": {
		get: function () {
			return true; // for now, always automate the preview
		}
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
	},

	updatePagePreviewImage: function (uicid, fileID) {
		var firstImage;

		if (this.get("autoPreview") === false) {
			return;
		}

		firstImage = this.findFirstContentOfType("image");
		if (firstImage && firstImage.uicid === uicid) {
			this.set("previewImageID", fileID);
		}
	},

	updatePagePreviewText: function (uicid, html) {
		var prevText,
			firstText;

		if (this.get("autoPreview") === false) {
			return;
		}

		firstText = this.findFirstContentOfType("text");
		if (firstText && firstText.uicid === uicid) {
			html = html.replace(/></g, "> <");
			prevText = $('<div/>').html(html).text().substring(0, 223);
			prevText = prevText.substring(0, prevText.lastIndexOf(" ")) + " ...";
			this.set("previewText", prevText);
		}
	},

	findFirstContentOfType: function (type) {
		/// <summary>type - component type/key.</summary>
		var retItem = null;
		_.every(this.template.get("content"), function (item) {
			if (item.key === type) {
				retItem = item;
				return false;
			}
			return true;
		}, this);
		return retItem;
	},

	getFile: function (fileID) {
		var file = _.where(this.attributes.files, { id: fileID });
		return (file.length === 1) ? file[0] : null;
	},
	
	getPageLink: function (pageID) {
		var link = _.where(this.get("pageLinks"), { id: parseInt(pageID) });
		return (link.length === 1) ? link[0] : {};
	},
	
	addPageLinkRef: function (page) {
		this.get("pageLinks").push(page.toJSON ? page.toJSON() : page);
	},

	getNavLinks: function (navLinksID) {
		var links = _.where(this.get("navLinks"), { id: parseInt(navLinksID) });
		return (links.length === 1) ? links[0] : null;
	},
	
	addNavLinksRef: function (navLink) {
		this.get("navLinks").push(navLink.toJSON ? navLink.toJSON() : navLink);
	},
	
	getPayPalButton: function (id) {
		var button = _.where(this.get("payPalButtons"), { id: parseInt(id) });
		return (button.length === 1) ? button[0] : {};
	}
};


pageModel.model("page", ["attrs", "options", "modelFactory", "appurl", "pageurl", page]);
