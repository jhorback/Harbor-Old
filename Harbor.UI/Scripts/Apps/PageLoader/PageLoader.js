var PageLoader = new Application({
	currentPage: null,
	pageState: null,
	    
	start: function (pageDto) {
		var frameBody;

		frameBody = $("#frame-body");
		frameBody.append('<div id="pageloader"/>');

		this.currentPage = new PageModels.Page(pageDto);
		this.pageState = new Backbone.Model({ mode: "view" });
		this.pageState.on("change:mode", function (model, mode) {
			this[mode]();
		}, this);
		    
		PageLoader.regions.loader.render(new PageLoader.PageNav({
			model: this.pageState
		}));
	},
		
	regions: {
		"loader": "#pageloader",
		"page": "#page",
		"frameBody": "#frame-body"
	},
	    
	view: function () {
		this.loadedPageEditor && PageEditor.dispose();
		this.loadedPageSettings && PageSettings.dispose();
	},
	    
	edit: function () {
		JSPM.install("PageEditor", function () {
		    this.loadedPageEditor = true;
		    PageEditor.start({
		        el: PageLoader.regions.page.getEl(),
		        page: this.currentPage
		    });
		}, this);
	},

	settings: function () {
	    JSPM.install("PageSettings", function () {
	        this.loadedPageSettings = true;
		    PageSettings.start({
		        page: this.currentPage
		    });
		}, this);
	}
});

PageLoader.events.on("modal:opened", function () {
    PageLoader.regions.page.hideEl();
    PageLoader.regions.loader.hideEl();
});

PageLoader.events.on("modal:closed", function () {
    PageLoader.regions.loader.showEl();
    PageLoader.regions.page.showEl();
})


// update the class names if the layout is updated
PageLoader.events.on("layout:updated", function () {
    var classNames = PageLoader.currentPage.getLayoutClassNames();
    var el = PageLoader.regions.page.getEl();
    el.find(".page-header").removeClass().addClass("page-header").addClass(classNames);
    el.find(".page-body").removeClass().addClass("page-body").addClass(classNames);
});


PageLoader.events.on("page:updated", function () {
    var el = PageLoader.regions.page.getEl();
    el.find("[data-bind=title]").html(PageLoader.currentPage.get("title"));
});