
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
		this.header = this.modelFactory.createGeneric(this.attributes.header);
		this.aside = this.modelFactory.createGeneric(this.attributes.aside);
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




