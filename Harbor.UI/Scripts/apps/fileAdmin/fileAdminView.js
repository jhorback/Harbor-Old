
fileAdmin.fileAdminView = function (options, fileAdminViewModelRepo, menuListFactory, fileAdminRouter) {

	this.fileAdminRouter = fileAdminRouter;
	this.fileAdminViewModelRepo = fileAdminViewModelRepo;
	this.menuListFactory = menuListFactory;
};


fileAdmin.fileAdminView.prototype = {	
	initialize: function () {
		this.model = this.fileAdminViewModelRepo.getViewModel();
		
		this.listenTo(this.model.albums, "sync", this.albumsSync);
		this.listenTo(this.model.pagerModel, "change:skip", this.fileAdminViewModelRepo.updateAlbums);
		this.listenTo(this.model, "change:filter", this.onChangeFilter);
	},

	onRender: function () {
		this.menuListFactory.create(this.$("#fileAdminMenuList"), {
			items: this.model.filters,
			model: this.model,
			attr: "filter"
		});
	},
	
	onChangeFilter: function () {
		var filter = this.model.get("filter");
		if (filter === "none") {
			this.fileAdminRouter.search(this.model.get("search"));
		} else if (this.fileAdminRouter[filter]) {
			this.fileAdminRouter[filter]();
		} else {
			alert("Filter not defined on the router: " + filter);
		}
	},
	
	albumsSync: function () {
		var totalCount = this.model.albums.totalCount; // jch! need to manage
		this.model.pagerModel.set("totalCount", totalCount);
		this.$el.closest("body").scrollTop(0);	
	},
	
	clickTile: function (event) {
		var fileId = $(event.target).closest(".tile").attr("id");
			
		event.preventDefault();
		this.fileAdminRouter.editFile(fileId);
	},
	
	clickUpload: function (event) {
		event.preventDefault();
		this.model.toggleUploadState();
	},
	
	submitSearchForm: function (event) {
		event.preventDefault();
		this.model.set("filter", "none");
		this.fileAdminRouter.search(this.model.get("search"));
	}
};


fileAdmin.view("fileAdminView", [
	"options", "fileAdminViewModelRepo", "menuListFactory", "fileAdminRouter",
	fileAdmin.fileAdminView]);