

pageEditor.linksModel = function (attrs, options, collectionFactory, currentPageRepo, navLinksRepo) {

	this.sections = collectionFactory.createGeneric(attrs.sections, {
		model: "linksSectionModel"
	});
	
	this.sections.on("all", this.save, this);
	this.currentPageRepo = currentPageRepo;
	this.navLinksRepo = navLinksRepo;
};

pageEditor.linksModel.prototype = {
	component: {
		pageProperties: ["navLinksID"],

		getDefaults: function (page, pageProperties) {
			if (pageProperties.navLinksID) {
				var props = page.getNavLinks(pageProperties.navLinksID);
				return _.pick(props, "id", "name", "sections");
			}
			return {};
		}
	},
	
	defaults: {
		id: null,
		name: null,
		sections: [],
		navLinksID: null,
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
	
	save: function (options) {
		this.updateIsEmpty();
		
		if (options && options.savePage) {
			return this.currentPageRepo.saveCurrentPage();
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
