
function pageAdminView(options, pageAdder, pageAdminViewModelRepo) {
	
	this.pageAdder = pageAdder;
	this.pageAdminViewModelRepo = pageAdminViewModelRepo;
}


pageAdminView.prototype = {
	
	initialize: function () {

		this.model = this.pageAdminViewModelRepo.getViewModel();

		this.listenTo(this.model.pages, "sync", this.pagesSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.pageAdminViewModelRepo.updatePages());
		
		this.pageAdminViewModelRepo.updatePages();
	},
	
	pagesSync: function () {
		var totalCount = this.model.pages.totalCount;
		this.model.pagerModel.set("totalCount", totalCount);
		//this.model.set("resultsCount", totalCount);
		//this.model.refresh("resultsMessage");
		this.$el.closest("body").scrollTop(0);
	},
	
	addPage: function () {
		this.pageAdder.render();
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
pageAdminView]);


