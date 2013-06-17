

links.model("linksModel", {
	
	component: {
		pageProperties: ["id"],

		getDefaults: function (page, pageProperties) {
			if (pageProperties.id) {
				return _.pick(page.getNavLinks(pageProperties.id),
					"name", "sections");
			}
			return {};
		}
	},
	
	defaults: {
		id: null,
		name: null,
		sections: []
	},

	hasName: function () {
		return this.get("name") ? true : false;
	}
});