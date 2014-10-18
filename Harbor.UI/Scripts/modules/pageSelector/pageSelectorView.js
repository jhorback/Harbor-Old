

pageSelector.pageSelectorView = function (options, pageRepo, modelFactory) {
	
	this.pageRepo = pageRepo;
	this.modelFactory = modelFactory;
};

pageSelector.pageSelectorView.prototype = {

	initialize: function (options) {

		this.model = this.modelFactory.create("pageSelectorViewModel", {
			title: this.options.filter === "products" ? "Products" : "Pages",
			search: ""
		});

		this.model.pages = pageRepo.createPages();
		
		this.model.pagerModel = modelFactory.create("pagerModel", {
			take: 20,
			totalCount: 0
		});


		this.listenTo(this.model.pages, "sync", this.onSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.search);

		this.on("close", this.options.close);
		this.on("select", this.options.select);
	},

	addPage: function () {
		pageAdder.render({
			parentPageTypeKey: this.options.addFilterPageType,
			onAddPage: function (page) {
				this.selectAndClose(page.id); // jch! - page must be in this.model.pages
			}
		});
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
			title: searchTerm,
			filter: this.options.filter
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
