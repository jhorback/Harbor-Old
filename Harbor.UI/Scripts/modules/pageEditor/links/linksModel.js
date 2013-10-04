

pageEditor.linksModel = function (attrs, options, collectionFactory) {

	this.sections = collectionFactory.createGeneric(attrs.sections, {
		model: "linksSectionModel"
	});
	
	this.sections.on("all", this.updateIsEmpty, this);
};

pageEditor.linksModel.prototype = {
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
		sections: [],
		//
		isEmpty: true
	},

	initialize: function () {
		this.updateIsEmpty();
	},
	
	"[name]": {
		validate: {
			required: true
		}
	},

	"[sections]": {
		get: function (value) {
			return this.sections && this.sections.toJSON();
		},
		
		set: function (value) {
			this.sections.set(value);
		}
	},
	
	isNew: function () {
		return this.get("name") ? false : true;
	},
	
	updateIsEmpty: function () {
		this.set("isEmpty", this.sections.length === 0);
	}
};


pageEditor.model("linksModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageEditor.linksModel
]);
