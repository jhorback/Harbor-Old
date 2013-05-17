

pageModel.Page = Application.Model.extend({
	urlRoot: Application.url("api/pages"),
	
	template: null, // pageModel.Template
	
	previewImage: null, // FileModel
	
	//files: [], // FileModel
	
	//pageLinks: [], // Page
	
	//navLinks: [], // NavLinks
	
	defaults: {
	    id: null,
		title: null,
		author: null,
		pageTypeKey: "document",
		created: null,
		modified: null,
		enabled: true,
		published: true,
		template: null,
		properties: [],
		autoPreview: true,
		previewImageID: null,
		previewImage: null, // FileDto
		previewText: "",
		thumbUrl: "",
		//
		link: null,
		pageTypeDescription: null,
		publishedDisplay: null,
		publishedMessage: null
	},
	
	initialize: function () {
		var page = this, setPreviewFn;
		
		setPreviewFn = _.bind(function () {
			if (this.attributes.previewImage) {
				this.previewImage = new FileModel(this.attributes.previewImage);
			} else {
				this.previewImage = null;
			}
		}, this);
		
		this.set("link", this.getUrl());
		
		this.template = new pageModel.Template(this.get("template"));
		this.listenTo(this.template, "change", function () {
			page.set("template", page.template.toJSON());
		});

		setPreviewFn();
		this.on("change:previewImage", setPreviewFn);
	},
	
	title: {
		validate: {
			required: true
		}
	},

	getUrl: function () {
		return pageModel.getPageUrl(this.get("id"), this.get("title"));
	},
	
	pageTypeDescription: {
		get: function (currentValue) {
			var pageTypeKey = this.get("pageTypeKey"),
				pageType;
		
			if (!pageTypeKey) {
				return null;
			}
		
			pageType = pageModel.pageTypes && pageModel.pageTypes.find(function (type) {
				return type.get("key") === pageTypeKey;
			});
			return pageType && pageType.get("description");
		},
		
		bind: ["pageTypeKey"]
	},
	
	publishedDisplay: {
		get: function () {
			return this.get("published") ? "Published" : "Private";
		},
		
		bind: "published"
	},
	
	publishedMessage: {
		get: function () {
			return this.get("published") ?
				"Everyone can see this page." :
				"Only you can see this page.";
		},
		
		bind: ["published"]
	},
	
	thumbUrl: {
		get: function () {
			return this.previewImage && this.previewImage.get("thumbUrl");
		}
	},
	
	autoPreview: {
		get: function () {
			return true; // for now, always automate the preview
		}
	},
	
	getLayoutClassNames: function () {
		var classNames = [];
		if (this.template.get("layoutIsCentered")) {
			classNames.push("centered");
		}
		if (this.template.get("layoutIsReadable")) {
			classNames.push("readable");
		}
		if (!this.template.get("layoutHasNoSidebar")) {
		    classNames.push("aside");
		} else {
		    classNames.push("noaside");
		}
		return classNames.join(" ");
	},
	
	getProperty: function (name) {
		var props = this.get("properties");
		var prop = _.find(props, function (item) {
			return item.name === name;
		});
		return prop ? prop.value : null;
	},
	
	setProperty: function (name, value) {
		var props;
		
		this.deleteProperty(name);
		props = this.get("properties");

		props.push({
			name: name,
			value: value
		});
		
		this.set("properties", props);
	},
	
	deleteProperty: function (name) {
		var props = this.get("properties"),
			len = props.length;
		
		while (len--) {
			if (props[len].name === name) {
				props.splice(len, 1);
			}
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
	
	getPageLink: function (pageID) {
		var link = _.where(this.get("pageLinks"), { id: parseInt(pageID) });
		return (link.length === 1) ? link[0] : {};
	},
	
	getNavLinks: function (navLinksID) {
		var links = _.where(this.get("navLinks"), { id: parseInt(navLinksID) });
	}
});


pageModel.Pages = Backbone.Collection.extend({
	model: pageModel.Page,
	url: Session.url("api/pages"),
	search : function (title) {
		var pattern;
		
		if (title === "") {
			return this;
		}
		
		pattern = new RegExp(title,"gi");
		return _(this.filter(function (data) {
		  	return pattern.test(data.get("title"));
		}));
	}
});