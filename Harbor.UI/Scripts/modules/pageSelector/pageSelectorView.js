
pageSelector.pageSelectorView = function (options, currentPageRepo) {
	
	this.currentPageRepo = currentPageRepo;
};

pageSelector.pageSelectorView.prototype = {
	
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
		this.bindTemplate("PageSelector-Main");
	},
	
	renderResults: function (collection) {
		var resultsList = this.$(".pageselector-results ul");
		resultsList.empty();
		collection.each(function (page) {
			var model = _.pick(page.toJSON(), "id", "title", "previewText", "thumbUrl");
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
};


pageSelector.view("pageSelectorView", [
	"options",
	"currentPageRepo",
	pageSelector.pageSelectorView
]);
