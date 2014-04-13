
var pageLoader = context.app("pageLoader").use("bbext", "pageEditor", "pageSettings");


function pageLoaderStart(templateRenderer) {
	
	var frameBody = $("#frame-body");
	var view = templateRenderer.render("pageLoaderView");
	frameBody.append(view.$el);
	//app.render({
	//	regionEl: "#frame-body"
	//});
}

pageLoader.start(["templateRenderer", pageLoaderStart]);