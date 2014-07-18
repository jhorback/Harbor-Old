

pageEditor.linksModel = function (attrs, options, collectionFactory, currentPageRepo, navLinksRepo) {

	this.sections = collectionFactory.createGeneric(attrs.sections, {
		model: "linksSectionModel",
		comparator: function (model) {
			var node = $("[data-cid=" + model.cid + "]");
			var index = node.index();
			if (index === -1) {
				index = 1000;
			}
			return index;
		}
	});

	this.currentPageRepo = currentPageRepo;
	this.navLinksRepo = navLinksRepo;
};

pageEditor.linksModel.prototype = {
	component: {
		isAside: true // -> jch! - have this initi the model with the layout properties, on change of property then set the layout
		//pageProperties: ["navLinksID"],

		//getDefaults: function (page, pageProperties) {
		//	return page.layout.get("asideData");
		//}
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
		this.sections.on("save", this.save, this);
		//this.on("change:name", function () {
		//	this.save();
		//}, this);
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
		
		return $.when(this.currentPageRepo.saveCurrentPage(), this.navLinksRepo.updateLink(this));
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
