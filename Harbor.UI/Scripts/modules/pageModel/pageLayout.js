
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
		this.header = this.attributes.headerKey ? 
			this.modelFactory.createGeneric(_.extend({}, this.get("headerData"), this.attributes.header)) : 
			null;

		this.aside = this.attributes.asideKey ?
			this.modelFactory.createGeneric(_.extend({}, this.get("asideData"), this.attributes.aside)):
			null;
	},

	"[headerData]": {
		get: function (value) {
			return JSON.parse(value);
		},
		set: function (value) {
			return JSON.stringify(value);
		}
	},

	"[asideData]": {
		get: function (value) {
			return JSON.parse(value);
		},
		set: function (value) {
			return JSON.stringify(value);
		}
	}
};

pageModel.model("pageLayout", [
	"attrs",
	"options",
	"modelFactory",
	pageModel.pageLayout
]);




