var PageLoader = new Application({
	currentPage: null,
	pageState: null,
	    
	start: function (pageDto) {
		var frameBody;

		return;
		frameBody = $("#frame-body");
		frameBody.append('<div id="pageloader"/>');

		// ref: use modelFactory.get("page", pageDto);
		this.currentPage = new pageModel.Page(pageDto);
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
		return this.open();
	},

	settings: function () {
		return this.open().then(_.bind(function () {
			PageSettings.start({
				page: this.currentPage
			});
		}, this));
	},
	
	// waits for both edit and settings installs
	open: function () {
		return $.when(JSPM.install("PageEditor", function () {
			this.loadedPageEditor = true;
			PageEditor.start({
				el: PageLoader.regions.page.getEl(),
				page: this.currentPage
			});
			
			app("pageEditor").start();
		}, this),

			JSPM.install("PageSettings", function () {
				this.loadedPageSettings = true;
			}, this)
		);
	}
});

PageLoader.events.on("modal:opened", function () {
    PageLoader.regions.page.hideEl();
    PageLoader.regions.loader.hideEl();
});

PageLoader.events.on("modal:closed", function () {
    PageLoader.regions.loader.showEl();
    PageLoader.regions.page.showEl();
});


// update the class names if the layout is updated
PageLoader.events.on("layout:updated", function () {
    var classNames = PageLoader.currentPage.getLayoutClassNames(),
        el = PageLoader.regions.page.getEl(),
        aside =  el.find(".page-aside");
    el.removeClass().addClass("page").addClass(classNames);
});


PageLoader.events.on("page:updated", function () {
    var el = PageLoader.regions.page.getEl();
    el.find(".page-header h1").html(PageLoader.currentPage.get("title"));
});