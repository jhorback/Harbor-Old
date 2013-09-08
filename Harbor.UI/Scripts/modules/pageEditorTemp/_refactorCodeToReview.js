


/*


var PageLoader = new Application({
	currentPage: null,		
	regions: {
		"loader": "#pageloader",
		"page": "#page",
		"frameBody": "#frame-body"
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
*/