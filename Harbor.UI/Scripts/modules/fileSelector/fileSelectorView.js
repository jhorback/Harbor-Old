
/*
	options : {
		filter: "none | images",
		select: function (file) { },
		close: function () { },
	}
*/
function fileSelectorView(options, modelFactory, fileRepo) {
	
	this.model = modelFactory.create("fileSelectorViewModel", {
		title: options.filter === "images" ? "Images" : "Files"
	});

	this.model.files = fileRepo.getFiles({
		orderDesc: "modified",
		filter: options.filter
	});
}

fileSelectorView.prototype = {
	initialize: function () {
		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},
	
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

	renderResults: function (collection) {
		var resultsList = this.$(".fileselector-results ul");
		resultsList.empty();
		collection.each(function (file) {
			resultsList.append(this.template("FileSelector-FileListItem")(file.toJSON()));
		}, this);
	},

	search: function () {
		var results = this.model.files.search(this.model.get("search"));
		this.renderResults(results);
	},

	selectAndClose: function (selectedFileID) {
		var file;

		file = this.model.files.find(function (item) {
			return item.get("id") === selectedFileID;
		});

		this.trigger("select", file);
		this.close();
	},

	close: function () {
		this.trigger("close");
		this.remove();
	}
};


fileSelector.view("fileSelectorView", [fileSelectorView]);