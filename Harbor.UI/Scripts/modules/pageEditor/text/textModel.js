

pageEditor.textModel = {
	
	component: {
		pageProperties: ["text"],

		getDefaults: function () {
			return {};
		}
	},
	
	defaults: {
		text: null
	}
};


pageEditor.model("textModel", pageEditor.textModel);