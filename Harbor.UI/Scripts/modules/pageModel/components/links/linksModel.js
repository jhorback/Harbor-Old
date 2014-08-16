

pageModel.linksModel = function (attrs, options, collectionFactory) {

	this.collectionFactory = collectionFactory;
	this.page = options.page;
};

pageModel.linksModel.prototype = {

	defaults: {
		key: null,
		id: null,
		name: null,
		nextId: null,
		sections: [],
		//
		isEmpty: true
	},

	initialize: function (attrs) {
		
		this.sections = this.collectionFactory.create("linksSectionCollection", this.attributes.sections, {
			page: this.page
		});
		this.sections.on("add remove", this.refreshFn("isEmpty"));

		this.on("change:name", this.save);
		this.listenTo(this.sections, "save add remove sort", this.save);
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
			this.sections && this.sections.set(value);
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
		this.trigger("save");
	}
};


pageModel.model("linksModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageModel.linksModel
]);


