﻿
var PageModels = {
	pageTypes: null,
	
	getPageUrl: function (pageID, title) {
		return title ? Application.url("id/" + pageID + "/" + title.toLowerCase().replace(/ /g, "-")) : null;
	},
	
	init: function () {
		var dfd = $.Deferred();
		PageModels.pageTypes = new PageModels.PageTypes();
		AjaxRequest.handle(PageModels.pageTypes.fetch(), {
			success: dfd.resolve
		});
		return dfd.promise();
	}
};


PageModels.Page = Application.Model.extend({
	urlRoot: Application.url("api/pages"),
	
	template: null, // PageModels.Template
	
	previewImage: null, // FileModel
	
	defaults: {
	    id: null,
	    parentPageID: null,
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
		
		this.template = new PageModels.Template(this.get("template"));
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
		return PageModels.getPageUrl(this.get("id"), this.get("title"));
	},
	
	pageTypeDescription: {
		get: function (currentValue) {
			var pageTypeKey = this.get("pageTypeKey"),
				pageType;
		
			if (!pageTypeKey) {
				return null;
			}
		
			pageType = PageModels.pageTypes && PageModels.pageTypes.find(function (type) {
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
			prevText = $('<div/>').html(html).text().substring(0, 200);
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
	}
});


PageModels.Pages = Backbone.Collection.extend({
	model: PageModels.Page,
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


PageModels.PageType = Backbone.Model.extend({
	urlRoot: Session.url("api/pagetypes"),
	defaults: {
		key: null,
		name: null,
		description: null
	}
});


PageModels.PageTypes = Backbone.Collection.extend({
	url: Session.url("api/pagetypes"),
	model: PageModels.PageType
});


/*
header, content, and aside components have a uicid, key.
content has a classNames property.
*/
PageModels.Template = Backbone.Model.extend({
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
		GetSetModelExtension.extend(this);
	},
	
	layoutIsCenteredDisabled: {
		get: function (value) {
			return !this.get("layoutIsReadable");
		},
		
		bind: "layoutIsReadable"
	},

	layoutIsCentered: {
	    get: function (value) {
	        if (this.get("layoutIsReadable") === false) {
	            return false;
	        }
	        return value;
	    },
        bind: "layoutIsReadable"
	},

	getNextUICID: function () {
		var cc = this.get("componentCounter");
		this.set("componentCounter", cc + 1);
		return "pc-" + this.get("pageID") + "-" + cc;
	},
	
	addContent: function (key) {
		var content = this.get("content");
		content.push({
			key: key,
			classNames: ["col1"],
			uicid: this.getNextUICID()
		});
	},
	
	getNextUICID: function () {
		var cc = this.get("componentCounter") + 1;
		this.set("componentCounter", cc);
		return "pc-" + this.get("pageID") + "-" + cc;
	}
});