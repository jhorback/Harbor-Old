var Settings = new Application({
	
	settingsModel: null,

	start: function () {
	
		this.settingsModel = new Settings.AppSettings();
		
		return this.settingsModel.fetch().then(_.bind(function () {
			this.main();
		}, this));
	},
	
	regions: {
		dialog: "#settings-dialog"
	},
	
	actions: ["editName"],
	
	editName: function (editable, model) {
		return {
			view: new Settings.EditNameView({ model: model, editable: editable }),
			region: "dialog"
		};
	},
	
	main: function () {
		return new Settings.MainView({
			model: this.settingsModel,
			el: $(".page-content").show()
		});
	}
});