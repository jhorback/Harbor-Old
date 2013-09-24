

pageEditor.linksModel = {
	
	component: {
		pageProperties: ["pageID"],

		getDefaults: function (page, pageProperties) {
			if (pageProperties.pageID) {
				return _.pick(page.getNavLinks(pageProperties.pageID),
					"name", "sections");
			}
			return {};
		}
	},
	
	defaults: {
		pageID: null,
		name: null,
		sections: []
	},

	hasName: function () {
		return this.get("name") ? true : false;
	}
};



pageEditor.model("linksModel", pageEditor.linksModel);