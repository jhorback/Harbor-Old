
var pageLoader = context.app("pageLoader").use("bbext", "pageEditor", "pageSettings");


function pageLoaderStart(viewRenderer) {
	
	var frameBody = $("body"),
		view = viewRenderer.render("pageLoaderView");
	
	frameBody.append(view.$el);
}

pageLoader.start(["viewRenderer", pageLoaderStart]);