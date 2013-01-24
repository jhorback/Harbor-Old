
var PageSelector = new Application({
	start: function (options, callbackContext) {
		// options: region, close, select
		var pages = new PageModels.Pages(),
			mainViewModel = new PageSelector.MainViewModel(),
			mainView = new PageSelector.MainView({
				model: mainViewModel,
				collection: pages
			});
		options.region.render(mainView);
		mainView.on("close", options.close, callbackContext);
		mainView.on("select", options.select, callbackContext);
		pages.fetch({
			data: {
				orderDesc: "modified"
			}
		});
	},
	
	regions: {
		results: ".pageselector-results"
	}
});

PageSelector.MainView = Application.View.extend({
	
	events: {
		"click [data-rel=cancel]": "close",

		"click [data-rel=save]": function (event) {
			event.preventDefault();
			this.selectAndClose();
		},
		
		"submit form": function (event) {
			event.preventDefault();
			this.search();
		},
		
		"click .pageselector-results li": function (event) {
			this.selectAndClose($(event.target).closest("[data-id]").data("id"));
		},
		
		"keypress li": function (event) {
			if (event.keyCode == 13) {
				this.selectAndClose($(event.target).data("id"));
			}
		}
	},

	render: function () {
		//this.template("Settings-ChangeHomePage", this.$el)();
		this.renderTemplate("PageSelector-Main")();
		this.bindModelToView();
	},
	
	renderResults: function (collection) {
		var resultsList = this.$(".pageselector-results ul");
		resultsList.empty();
		collection.each(function (page) {
			resultsList.append(this.template("PageSelector-PageListItem")(page.toJSON()));
		}, this);
	},
	
	search: function () {
		var results = this.collection.search(this.model.get("search"));
		this.renderResults(results);
	},
	
	selectAndClose: function (selectedPageID) {
		var page;

		selectedPageID = parseInt(selectedPageID);
		page = this.collection.find(function (item) {
			return item.get("id") === selectedPageID;
		});
		
		this.trigger("select", page);
		this.close();
	},

	close: function () {
		this.trigger("close");
		this.remove();
	}
});


PageSelector.MainViewModel = Application.Model.extend({
	defaults: {
		search: null
	}		
});
