
fileAdmin.fileAdminComponentView = function (options, fileAdminViewModelRepo, menuListFactory, routerInfo) {

	this.routerInfo = routerInfo;
	this.fileAdminViewModelRepo = fileAdminViewModelRepo;
	this.menuListFactory = menuListFactory;
};


fileAdmin.fileAdminComponentView.prototype = {
	events: {
		"click [data-event=clickTile]": "clickTile"
	},
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
			this.routerInfo.executeRoute("search", [this.model.get("search")]);
		} else {
			this.routerInfo.executeRoute(filter);	
		}
	},
	
	albumsSync: function () {
		var totalCount = this.model.albums.totalCount;
		this.model.pagerModel.set("totalCount", totalCount);
		this.$el.closest("body").scrollTop(0);	
	},
	
	clickUpload: function (event) {
		event.preventDefault();
		this.model.toggleUploadState();
	},
	
	submitSearchForm: function (event) {
		event.preventDefault();
		this.model.set("filter", "none");
		this.routerInfo.executeRoute("search", [this.model.get("search")]);
	},
	
	clickTile: function (event) {
		var fileId = $(event.target).closest(".tile").attr("id");
		
		event.preventDefault();
		this.routerInfo.executeRoute("editFile", [fileId]);
	}
};


fileAdmin.view("fileAdminComponentView", [
	"options", "fileAdminViewModelRepo", "menuListFactory", "routerInfo",
	fileAdmin.fileAdminComponentView]);


fileAdmin.component("fileAdminComponent", {
	region: "#frame-body"
});
