

pageEditor.linksModel = function (attrs, options, collectionFactory) {

	this.collectionFactory = collectionFactory;
};

pageEditor.linksModel.prototype = {
	initialize: function () {
		this.sections = this.collectionFactory.createGeneric(this.get("sections"), {
			model: "linksSectionModel" // jch* not sure if this will work or if I need a bonified collection
		});
	},
	
	component: {
		pageProperties: ["pageID"],

		getDefaults: function (page, pageProperties) {
			if (pageProperties.pageID) {
				return _.pick(page.getNavLinks(pageProperties.pageID),
					"name", "sections");
			}
			return {};
		}
	},
	
	defaults: {
		pageID: null,
		name: null,
		sections: []
	},

	"[sections]": {
		get: function (value) {
			return this.sections.toJSON();
		}
	},
	
	isNew: function () {
		return this.get("name") ? false : true;
	}
};


pageEditor.model("linksModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageEditor.linksModel
]);
