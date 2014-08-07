

pageModel.linksModel = function (attrs, options, collectionFactory) {

	this.collectionFactory = collectionFactory;
};

pageModel.linksModel.prototype = {

	defaults: {
		key: null,
		id: null,
		name: null,
		sections: [],
		//
		isEmpty: true
	},

	initialize: function (attrs) {
		this.save = _.debounce(this.save, 250);

		this.sections = this.collectionFactory.create("linksSectionCollection", this.attributes.sections);
		this.sections.on("all", this.refresh("isEmpty"));

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
			return value;
		}
	},

	"[isEmpty]": {
		get: function () {
			return this.sections.length === 0;
		}
	},
	
	isNew: function () {
		return this.get("name") ? false : true;
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


