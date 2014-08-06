

pageModel.linksModel = function (attrs, options, collectionFactory) {

	this.collectionFactory = collectionFactory;
};

pageModel.linksModel.prototype = {

	defaults: {
		id: null,
		name: null,
		sections: [],
		navLinksID: null,
		//
		isEmpty: true
	},

	initialize: function (attrs) {
		this.save = _.debounce(this.save, 250);

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
		this.sections.on("save add remove", this.save, this);
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
		debugger;
		this.savePage();
	}
};


pageModel.model("linksModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageModel.linksModel
]);


