
var FileSelector = new Application({
	
	start: function (options, callbackContext) {
		// options: region, close, select, filter: none, images
		
		var files = new FileModel.Files(),
			mainViewModel = new FileSelector.MainViewModel({
				title: options.filter === "images" ? "Images" : "Files"
			}),
			mainView = new FileSelector.MainView({
				model: mainViewModel,
				collection: files
			});
		options.region.render(mainView);
		mainView.on("close", options.close, callbackContext);
		mainView.on("select", options.select, callbackContext);
		files.fetch({
			data: {
				orderDesc: "modified",
				filter: options.filter
			}
		});
	},
	
	regions: {
		results: ".FileSelector-results"
	}
});

FileSelector.MainView = Application.View.extend({
	
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
		
		"click .fileselector-results li": function (event) {
			this.selectAndClose($(event.target).closest("[data-id]").data("id"));
		},
		
		"keypress li": function (event) {
			if (event.keyCode == 13) {
				this.selectAndClose($(event.target).data("id"));
			}
		}
	},

	render: function () {
		//this.template("Settings-ChangeHomeFile", this.$el)();
		this.bindTemplate("FileSelector-Main");
	},
	
	renderResults: function (collection) {
		var resultsList = this.$(".fileselector-results ul");
		resultsList.empty();
		collection.each(function (file) {
			resultsList.append(this.template("FileSelector-FileListItem")(file.toJSON()));
		}, this);
	},
	
	search: function () {
		var results = this.collection.search(this.model.get("search"));
		this.renderResults(results);
	},
	
	selectAndClose: function (selectedFileID) {
		var file;

		file = this.collection.find(function (item) {
			return item.get("id") === selectedFileID;
		});
		
		this.trigger("select", file);
		this.close();
	},

	close: function () {
		this.trigger("close");
		this.remove();
	}
});


FileSelector.MainViewModel = Application.Model.extend({
	defaults: {
		title: "Files",
		search: null
	}		
});
