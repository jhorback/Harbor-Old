
var pageLoader = context.app("pageLoader").use("bbext", "pageEditor", "pageSettings");


function pageLoaderStart(app) {
	
	app.render("#frame-body");

}

pageLoader.start(["app", pageLoaderStart]);