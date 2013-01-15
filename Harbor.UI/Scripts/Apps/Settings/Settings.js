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
	
	main: function () {
		var view = new Settings.MainView({
			model: this.settingsModel,
			el: this.regions.pageContent.getEl().show()
		});
		view.render();
	},
	
	editName: function (editable) {
		var view = new Settings.EditNameView({
			model: this.settingsModel,
			editable: editable
		});
		view.render();
	},
	
	changeHomePage: function () {
		
		// assumes PageSelector is already loaded
		Settings.regions.main.hideEl();	
		PageSelector.open({
			region: this.regions.page,
			close: function () {
				Settings.regions.main.showEl();
			},
			select: function (selectedPage) {
				this.settingsModel.setHomePage(selectedPage);
				AjaxRequest.handle(this.settingsModel.save());
			}
		}, this);
	},
	
	resetHomePage: function () {
		this.settingsModel.setHomePage(null);
		AjaxRequest.handle(this.settingsModel.save());
	},
	
	updateNav: function () {
		var view = new Settings.EditNavView({
			el: $(document.body),
			model: this.settingsModel
		});
		
		view.render();
	}
});