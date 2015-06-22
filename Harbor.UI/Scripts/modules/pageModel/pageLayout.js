
pageModel.pageLayout = function (attrs, options, modelFactory) {
	this.modelFactory = modelFactory;
	this.page = options.page;
};

pageModel.pageLayout.prototype = {
	defaults:{
		id: null,
		parentPageId: null,
		title: null,

		layoutIsCentered: null, 
		layoutHasNoSidebar: null,

		headerKey: null, 
		header: null, // uicid, key
		headerData: null,
		
		asideKey: null, 
		aside: null, // uicid, key - 
		asideData: null
	},

	initialize: function () {
		var attrs = this.attributes,
			headerAttrs = _.extend(attrs.headerData || {}, attrs.header),
			asideAttrs = _.extend(attrs.asideData || {}, attrs.aside);

		this.header = attrs.headerKey ? 
			this.modelFactory.create(attrs.headerKey + "Model", headerAttrs, {page: this.page} ) : 
			null;
		
		this.aside = attrs.asideKey ?
			this.modelFactory.create(attrs.asideKey + "Model", asideAttrs, {page: this.page}):
			null;
	},

	"[aside]": {
		get: function () {
			return this.aside && this.aside.toJSON();
		},
		set: function (value) {
			this.aside && this.aside.set(value);
			return value;
		}
	},

	"[asideData]": {
		get: function () {
			return this.aside && this.aside.toJSON();
		},
		set: function (value) {
			this.aside && this.aside.set(value);
			return value;
		}
	},

	"[header]": {
		get: function () {
			return this.header && this.header.toJSON();
		},
		set: function (value) {
			this.header && this.header.set(value);
			return value;
		}
	},

	"[headerData]": {
		get: function () {
			return this.header && this.header.toJSON();
		},
		set: function (value) {
			this.header && this.header.set(value);
			return value;
		}
	}
};

pageModel.model("pageLayout", [
	"attrs",
	"options",
	"modelFactory",
	pageModel.pageLayout
]);




