

/*
var PageSelector = new Application({
	start: function (options, callbackContext) {
		// options: region, close, select
		//ref: use pageRepo.getPages();
		var pages = new pageModel.Pages(),
			mainViewModel = new PageSelector.MainViewModel(),
			mainView = new PageSelector.MainView({
				model: mainViewModel,
				collection: pages
			});
		options.region.render(mainView);
		
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
*/

pageSelector.pageSelectorView = function (options, pageRepo, modelFactory) {
	
	this.pageRepo = pageRepo;

	this.model = modelFactory.create("pageSelectorViewModel", {
		search: ""
	});

	this.model.pages = pageRepo.createPages();
	
	this.listenTo(this.model.pages, "all", function () {
		this.model.set("resultsCount", this.model.pages.length);
	}, this);
};

pageSelector.pageSelectorView.prototype = {

	initialize: function () {
		
		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},
	
	formSubmit: function (event) {
		
		event.preventDefault();
		this.search();
	},
	
	clickItem: function (event) {
		this.selectAndClose($(event.target).closest("[data-id]").data("id"));
	},
	
	selectItemOnEnter: function (event) {
		
		if (event.keyCode == 13) {
			this.selectAndClose($(event.target).data("id"));
		}
	},

	search: function () {
		var searchTerm = this.model.get("search");
		
		this.pageRepo.fetchPages(this.model.pages, {
			orderDesc: "modified",
			name: searchTerm
		});
	},
	
	selectAndClose: function (selectedPageID) {
		var page;

		selectedPageID = parseInt(selectedPageID);
		page = this.collection.find(function (item) {
			return item.get("id") === selectedPageID;
		});
		
		this.trigger("select", page);
		this.close();
	}
};


pageSelector.view("pageSelectorView", [
	"options",
	"pageRepo",
	"modelFactory",
	pageSelector.pageSelectorView
]);
