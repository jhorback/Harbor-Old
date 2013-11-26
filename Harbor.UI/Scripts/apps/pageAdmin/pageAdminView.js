
function pageAdminView(options, pageRepo, currentUserRepo, pageAdder, modelFactory) {
	this.pageRepo = pageRepo;
	this.currentUser = currentUserRepo.getCurrentUser();
	this.pageAdder = pageAdder;
	this.modelFactory = modelFactory;
}


pageAdminView.prototype = {
	
	initialize: function () {
		var pagerModel;

		pagerModel = this.modelFactory.create("pagerModel", {
			take: 5
		});
	
		this.model = this.modelFactory.create("pageAdminViewModel", {}, {
			pagerModel: pagerModel
		});
		
		this.model.pages = this.pageRepo.createPages();
		
		this.listenTo(this.model.pages, "sync", this.pagesSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.updateList);
		
		this.updateList();
	},
	
	pagesSync: function () {
		var totalCount = this.model.pages.totalCount;
		this.model.pagerModel.set("totalCount", totalCount);
		//this.model.set("resultsCount", totalCount);
		//this.model.refresh("resultsMessage");
		this.$el.closest("body").scrollTop(0);
	},
	
	updateList: function () {
		this.pageRepo.fetchPages(this.model.pages, this.model.pagerModel.extend({
			author: this.currentUser.get("username"),
			orderDesc: "modified"
		}));
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
	"pageRepo",
	"currentUserRepo",
	"pageAdder",
	"modelFactory",
pageAdminView]);


