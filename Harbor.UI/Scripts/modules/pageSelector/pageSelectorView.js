

pageSelector.pageSelectorView = function (options, pageRepo, modelFactory, pageAdder, feedback) {
	
	this.pageRepo = pageRepo;
	this.modelFactory = modelFactory;
	this.pageAdder = pageAdder;
	this.feedback = feedback;
};

pageSelector.pageSelectorView.prototype = {

	initialize: function (options) {
		this.bindAll("selectPageAndClose");

		this.model = this.modelFactory.create("pageSelectorViewModel", {
			title: this.options.filter === "products" ? "Products" : "Pages",
			allowPageAdd: this.options.allowPageAdd || false,
			search: ""
		});

		this.model.pages = this.pageRepo.createPages();
		
		this.model.pagerModel = this.modelFactory.create("pagerModel", {
			take: 20,
			totalCount: 0
		});


		this.listenTo(this.model.pages, "sync", this.onSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.search);

		this.on("close", this.options.close);
	},

	addPage: function (event) {

		this.pageAdder.render({
			parentPageTypeKey: this.options.addFilterPageType,
			onAddPage: this.selectPageAndClose,
			createPage: this.options.createPage
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
		var searchTerm = this.model.get("search"),
			wait = this.feedback.wait("Searching...");
		
		this.pageRepo.fetchPages(this.model.pages, this.model.pagerModel.extend({
			orderDesc: "modified",
			title: searchTerm,
			filter: this.options.filter
		})).then(wait.finished);
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

		this.selectPageAndClose(page);
	},

	selectPageAndClose: function (page) {
		this.pageAdder && this.pageAdder.close();
		this.options.select && this.options.select(page);
		this.close();
	}
};


pageSelector.view("pageSelectorView", [
	"options",
	"pageRepo",
	"modelFactory",
	"pageAdder",
	"feedback",
	pageSelector.pageSelectorView
]);
