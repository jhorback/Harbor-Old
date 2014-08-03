
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
			this.modelFactory.createGeneric(_.extend({}, attrs.headerData, attrs.header)) : 
			null;

		this.aside = attrs.asideKey ?
			this.modelFactory.createGeneric(_.extend({}, attrs.asideData, attrs.aside)):
			null;
	}
};

pageModel.model("pageLayout", [
	"attrs",
	"options",
	"modelFactory",
	pageModel.pageLayout
]);




