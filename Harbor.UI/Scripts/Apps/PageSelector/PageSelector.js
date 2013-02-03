
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
			var model = _.pick(page.toJSON(), "id", "title", "previewText");
			var previewImage = page.previewImage;
			model.thumbUrl = previewImage ? previewImage.get("thumbUrl") : null;
			model.previewText = "Here is a short sentence on what preview text may look like. I'm not sure if this is over 150 characters or not ...";
			resultsList.append(this.template("PageSelector-PageListItem")(model));
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
