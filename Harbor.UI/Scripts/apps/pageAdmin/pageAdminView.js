
function pageAdminView(options, pageAdder, pageAdminViewModelRepo, menuListFactory, pageAdminRouter) {
	
	this.pageAdder = pageAdder;
	this.pageAdminViewModelRepo = pageAdminViewModelRepo;
	this.menuListFactory = menuListFactory;
	this.pageAdminRouter = pageAdminRouter;
}


pageAdminView.prototype = {
	
	initialize: function () {

		this.model = this.pageAdminViewModelRepo.getViewModel();

		this.listenTo(this.model.pages, "sync", this.pagesSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.pageAdminViewModelRepo.updatePages);
		this.listenTo(this.model, "change:filter", this.onChangeFilter);
	},
	
	onRender: function () {
		this.menuListFactory.create(this.$("#pageAdminMenuList"), {
			items: this.model.filters,
			model: this.model,
			attr: "filter"
		});
	},
	
	onChangeFilter: function () {
		var filter = this.model.get("filter");
		if (filter === "search") {
			this.pageAdminRouter.search(this.model.get("search"));
		} else if (filter === "recent") {
			this.pageAdminRouter.recent();
		} else if (filter === "products") {
			this.pageAdminRouter.products();
		}
	},
	
	pagesSync: function () {
		var totalCount = this.model.pages.totalCount;
		this.model.pagerModel.set("totalCount", totalCount);
		this.$el.closest("body").scrollTop(0);
	},
	
	addPage: function () {
		this.pageAdder.render();
	},
	
	submitSearchForm: function (event) {
		event.preventDefault();
		this.model.set("filter", "search");
		this.pageAdminRouter.search(this.model.get("search"));
	},
	
	clickTile: function (event) {
		var target = $(event.target);
		var tile = target.closest(".tile");
		document.location = tile.find("a").attr("href");
	}
};


pageAdmin.view("pageAdminView", [
	"options",
	"pageAdder",
	"pageAdminViewModelRepo",
	"menuListFactory",
	"pageAdminRouter",
	pageAdminView
]);


