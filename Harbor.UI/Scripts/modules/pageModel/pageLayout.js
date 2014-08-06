
pageModel.pageLayout = function (attrs, options, modelFactory) {
	this.modelFactory = modelFactory;
};

pageModel.pageLayout.prototype = {
	defaults:{
		id: null, 
		layoutIsCentered: null, 
		layoutIsReadable: null, 
		layoutHasNoSidebar: null,

		headerKey: null, 
		header: null, // uicid, key
		headerData: null,
		
		asideKey: null, 
		aside: null, // uicid, key - 
		asideData: null
	},

	initialize: function () {
		var attrs = this.attributes;

		this.header = attrs.headerKey ? 
			this.modelFactory.create(attrs.headerKey + "Model", _.extend({}, attrs.headerData, attrs.header)) : 
			null;
		
		this.aside = attrs.asideKey ?
			this.modelFactory.create(attrs.asideKey + "Model", _.extend({}, attrs.asideData, attrs.aside)):
			null;
		
		this.on("sync", this.onSync);
	},

	onSync: function () {
		var attrs = this.attributes;

		this.header && this.header.set(attrs.header);
		this.aside && this.aside.set(attrs.aside);
	},

	"[aside]": {
		get: function () {
			return this.aside && this.aside.toJSON();
		},
		set: function (value) {
			this.aside && this.aside.set(value);
		}
	},

	"[header]": {
		get: function () {
			return this.header.toJSON();
		},
		set: function (value) {
			this.header.set(value);
		}
	}
};

pageModel.model("pageLayout", [
	"attrs",
	"options",
	"modelFactory",
	pageModel.pageLayout
]);




