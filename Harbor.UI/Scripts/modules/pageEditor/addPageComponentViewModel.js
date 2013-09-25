

pageEditor.addPageComponentViewModel = function () {

};

pageEditor.addPageComponentViewModel.prototype = {
	defaults: {
		title: null,
		userHint: null,
		componentType: null,
		pageComponentKey: null,
		//
		pageComponents: null, // need this passed in to get the description
		pageComponentDescription: null
	},

	toJSON: function () {
		return _.pick(this.attributes, "pageComponentKey", "componentType");
	},
	
	title: {
		get: function () {
			return {
				header: "Change the header",
				aside: "Add content",
				content: "Add content"
			}[this.get("componentType")];
		}
	},
	
	userHint: {
		get: function () {
			if (this.get("componentType") === "header") {
				return "What kind of header do you want?";
			}
			return "What do you want to add?";
		}
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