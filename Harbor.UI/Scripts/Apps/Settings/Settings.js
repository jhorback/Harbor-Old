var Settings = new Application({
	
	settingsModel: null,

	start: function () {
	
		this.settingsModel = new Settings.AppSettings();
		
		return this.settingsModel.fetch().then(_.bind(function () {
			this.main();
		}, this));
	},
	
	regions: {
		main: "#settings-main",
		pageContent: ".page-content",
		page: "#settings-page"
	},
	
	actions: ["changeHomePage"],
	
	editName: function (editable) {
		var view = new Settings.EditNameView({
			model: this.settingsModel,
			editable: editable
		});
		view.render();
	},
	
	changeHomePage: function () {
		return {
			view: new Settings.ChangeHomePageView({
				model: this.settingsModel			
			}),
			region: "page"
		};
	},
	
	main: function () {
		var view = new Settings.MainView({
			model: this.settingsModel,
			el: this.regions.pageContent.getEl().show()
		});
	}
});