

pageEditor.textModel = {
	
	component: {
		pageProperties: ["text"],

		getDefaults: function () {
			return {
				text: "NADA TEXT"
			};
		}
	},
	
	defaults: {
		text: "[NO TEXT DEFULT]"
	}
	//,
	//"[text]": {
	//	get: function (value) {
	//		if (!value) {
	//			return "[NO TEXT]";
	//		}
	//		return value;
	//	}
	//}
};


pageEditor.model("textModel", pageEditor.textModel);