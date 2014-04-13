
var pageLoader = context.app("pageLoader").use("bbext", "pageEditor", "pageSettings");


function pageLoaderStart(templateRenderer) {
	
	var frameBody = $("#frame-body"),
		view = templateRenderer.render("pageLoaderView");
	
	frameBody.append(view.$el);
}

pageLoader.start(["templateRenderer", pageLoaderStart]);