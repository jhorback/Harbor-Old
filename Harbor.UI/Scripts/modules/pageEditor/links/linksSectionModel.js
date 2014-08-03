
pageEditor.linksSectionModel = function (attrs, options, collectionFactory) {
	this.collectionFactory = collectionFactory;
};

pageEditor.linksSectionModel.prototype = {
	defaults: {
		title: null,
		hasTitle: false,
		links: []
	},

	initialize: function (attrs, options) {
	
		this.links = this.collectionFactory.createGeneric(attrs.links || [], {
			model: "linkSectionLinkModel",
			comparator: function (model) {
				var node = $("#" + model.cid);
				var index = node.index();
				return index;
			}
		});

		this.on("change:title", this.save);
		this.links.on("save add remove", this.save);
	},
	
	"[links]": {
		get: function () {
			var links = this.links && this.links.toJSON();
			return links;
		},

		set: function (value) {
			this.links && this.links.set(value); //, { silent: true});
		}
	},

	"[hasTitle]": {
		get: function () {
			return this.get("title") ? true : false;
		}
	},

	save: function () {
		this.trigger("save");
	}
};


pageEditor.model("linksSectionModel", [
	"attrs",
	"options",
	"collectionFactory",
	pageEditor.linksSectionModel
]);