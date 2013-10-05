

pageEditor.linksModel = function (attrs, options, collectionFactory, currentPageRepo, navLinksRepo) {

	this.sections = collectionFactory.createGeneric(attrs.sections, {
		model: "linksSectionModel"
	});
	
	this.sections.on("all", this.save, this);
	this.navLinksRepo = navLinksRepo;
};

pageEditor.linksModel.prototype = {
	component: {
		pageProperties: ["pageID"],

		getDefaults: function (page, pageProperties) {
			if (pageProperties.pageID) {
				return _.pick(page.getNavLinks(pageProperties.pageID),
					"id", "name", "sections");
			}
			return {};
		}
	},
	
	defaults: {
		id: null,
		name: null,
		sections: [],
		pageID: null,
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
			this.sections.set(value, { silent: true});
		}
	},
	
	isNew: function () {
		return this.get("name") ? false : true;
	},
	
	updateIsEmpty: function () {
		this.set("isEmpty", this.sections.length === 0);
	},
	
	addSection: function () {
		this.sections.add({});
	},
	
	save: function () {
		this.updateIsEmpty();
		
		if (this.isNew()) {
			return currentPageRepo.saveCurrentPage();
		}
		
		return this.navLinksRepo.updateLink(this);
	}
};


pageEditor.model("linksModel", [
	"attrs",
	"options",
	"collectionFactory",
	"currentPageRepo",
	"navLinksRepo",
	pageEditor.linksModel
]);
