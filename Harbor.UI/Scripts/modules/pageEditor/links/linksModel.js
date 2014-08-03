

pageEditor.linksModel = function (attrs, options, collectionFactory, currentPageRepo) {

	this.collectionFactory = collectionFactory;
	this.currentPageRepo = currentPageRepo;
};

pageEditor.linksModel.prototype = {
	component: {
		isAside: true
	},
	
	defaults: {
		id: null,
		name: null,
		sections: [],
		navLinksID: null,
		//
		isEmpty: true
	},

	initialize: function (attrs) {
		this.sections = this.collectionFactory.createGeneric(attrs.sections, {
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

		this.updateIsEmpty();
		
		this.on("change:name", this.save);
		this.sections.on("save", this.save, this);
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
			this.sections && this.sections.set(value); // , { silent: true});
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
		this.currentPageRepo.saveCurrentPage();
	}
};


pageEditor.model("linksModel", [
	"attrs",
	"options",
	"collectionFactory",
	"currentPageRepo",
	pageEditor.linksModel
]);
