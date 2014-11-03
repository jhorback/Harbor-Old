

pageAdder.pageAdderViewModel = {
	defaults: {
		title: null,
		pageTypeKey: null,
		hasOtherPageTypes: false
	},

	initialize: function () {

		this.pageTypes = this.createCollection("pageTypeCollection");
		this.primaryPageTypes = this.createCollection("pageTypeCollection");
		this.otherPageTypes = this.createCollection("pageTypeCollection");

		this.listenTo(this.pageTypes, "sync", this.pageTypesSync);
	},
	
	pageTypesSync: function () {
		var primary = this.pageTypes.where({isPrimaryToAdd: true}),
			other = this.pageTypes.where({isPrimaryToAdd: false});	
		this.primaryPageTypes.reset(primary);
		this.otherPageTypes.reset(other);
		if (other.length > 0) {
			this.set("hasOtherPageTypes", true);
		}
	},

	"[title]": {
		validate: {
			required: true
		}
	},

	"[pageTypeKey]": {
		validate: {
			required: {
				message: "Please select a page type."
			}
		}
	}
};

pageAdder.model("pageAdderViewModel", pageAdder.pageAdderViewModel);