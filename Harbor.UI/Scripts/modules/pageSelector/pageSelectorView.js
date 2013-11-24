

pageSelector.pageSelectorView = function (options, pageRepo, modelFactory) {
	var pagerModel;
	
	this.pageRepo = pageRepo;
	
	pagerModel = modelFactory.create("pagerModel", {
		take: 20,
		totalCount: 0
	});

	this.model = modelFactory.create("pageSelectorViewModel", {
		search: ""
	}, {
		pagerModel: pagerModel
	});


	this.model.pages = pageRepo.createPages();
	this.listenTo(this.model.pages, "sync", this.onSync);
	this.listenTo(pagerModel, "change:skip", this.search);
};

pageSelector.pageSelectorView.prototype = {

	initialize: function () {
		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},
	
	onSync: function () {
		var totalCount = this.model.pages.totalCount;
		this.model.pagerModel.set("totalCount", totalCount);
		this.model.set("resultsCount", this.model.pages.length);
		this.model.refresh("resultsMessage");
		this.$el.closest("body").scrollTop(0);
	},

	formSubmit: function (event) {
		event.preventDefault();
		this.model.pagerModel.first();
		this.search();
	},
	
	search: function () {
		var searchTerm = this.model.get("search");
		
		this.pageRepo.fetchPages(this.model.pages, this.model.pagerModel.extend({
			orderDesc: "modified",
			title: searchTerm
		}));
	},
	
	clickItem: function (event) {
		var id = $(event.target).closest("[id]").attr("id");
		this.selectAndClose(id);
	},
	
	selectItemOnEnter: function (event) {
		var id = $(event.target).attr("id");		
		if (event.keyCode == 13) {
			this.selectAndClose(id);
		}
	},
	
	selectAndClose: function (selectedPageID) {
		var page;

		selectedPageID = parseInt(selectedPageID);
		page = this.model.pages.find(function (item) {
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
