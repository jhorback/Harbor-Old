
var settings = context.app("settings").use("pageSelector");
settings.start(["pageSelector", function (pageSelector) {
	settings.pageSelector = pageSelector;
}]).start();


var Settings = new Application({
	
	settingsModel: null,
	
	themes: [],

	start: function (themes) {
		this.themes = themes;
		this.settingsModel = new Settings.AppSettings();

		return this.settingsModel.fetch().then(_.bind(function () {
			this.main();
		}, this));
	},
	
	regions: {
		main: "#settings-main",
		pageContent: ".page-content",
		modal: "#settings-modal"
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
		// Settings.regions.main.hideEl();	
		settings.pageSelector.render({
			close: function () {
				// Settings.regions.main.showEl();
			},
			select: _.bind(this.setHomePage, this)
		});
	},
	
	setHomePage: function (page) {
		this.settingsModel.setHomePage(page);
		AjaxRequest.handle(this.settingsModel.save());
	},
	
	resetHomePage: function () {
		this.settingsModel.setHomePage(null);
		AjaxRequest.handle(this.settingsModel.save());
	},

	updateNav: function () {
		var view = new Settings.EditNavView({
			el: $(document.body),
			model: Settings.settingsModel
		});
		
		view.render();
	},
	
	changeTheme: function () {
		AjaxRequest.handle(Settings.settingsModel.save()).then(function () {
			location = location;
		});
	},
	
	updateFooter: function () {
		var view = new Settings.UpdateFooterView({
			// el: $(document.body),
			model: Settings.settingsModel
		});

		view.render();
	}
});