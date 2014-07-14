

pageEditor.addPageComponentViewModel = function () {

};

pageEditor.addPageComponentViewModel.prototype = {
	defaults: {
		pageComponentKey: null,
		//
		pageComponents: null, // need this passed in to get the description
		pageComponentDescription: null
	},

	toJSON: function () {
		return _.pick(this.attributes, "pageComponentKey");
	},

	pageComponentDescription: {
		get: function (value) {
			var pageComponentKey = this.get("pageComponentKey"),
				component,
				comps = this.get("pageComponents");

			if (!pageComponentKey) {
				return null;
			}

			if (!comps) {
				return value; // not loaded yet
			}

			component = new Backbone.Collection(comps).find(function (comp) {
				return comp.get("key") === pageComponentKey;
			});
			return component && component.get("description");
		},

		bind: ["pageComponentKey"]
	}
	
};

pageEditor.model("addPageComponentViewModel", [
	"attrs",
	"options",
	pageEditor.addPageComponentViewModel
]);