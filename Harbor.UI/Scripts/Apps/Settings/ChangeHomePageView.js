Settings.ChangeHomePageView = Application.View.extend({
	initialize: function () {
		Settings.regions.main.hideEl();
	},
	
	events: {
		"click [data-rel=cancel]": function () {
			this.remove();
			Settings.regions.main.showEl();
		}
	},

	render: function () {
		
		this.template("Settings-ChangeHomePage", this.$el)();
		

	}
});