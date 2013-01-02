﻿// model - Settings.AppSettings
Settings.MainView = Application.View.extend({
	
	initialize: function () {
		this.listenTo(this.model, "change:homePageID", this.renderHomePage);
	},
	
	events: {
		"change [name=showSignInLink]": function () {
			Session.AjaxRequest.handle(this.model.save());
		},

		"click .editable": function (event) {
			var editable = $(event.target).closest(".editable"),
				id = editable.attr("id");
			
			if (id === "settings-applicationName") {
				Settings.editName(editable);
			}
		},
		
		"click #settings-changehome": function () {
			Settings.changeHomePage();
		},
		
		"click #settings-resethome": function () {
			Settings.resetHomePage();
		}
	},

	render: function () {
		this.bindModelToView();
	},
	
	renderHomePage: function () {
		var homePage = Settings.settingsModel.homePage,
			homePageEl = this.$(".settings-homepage");

		if (homePage === null) { // default home page
			this.template("Settings-DefaultHomePage", homePageEl)();
			this.$("#settings-resethome").hide();
		} else {
			this.template("Settings-HomePageSetting", homePageEl)();
			this.bindModelToView(homePage, homePageEl);
			this.$("#settings-resethome").show();			
		}
	}
});