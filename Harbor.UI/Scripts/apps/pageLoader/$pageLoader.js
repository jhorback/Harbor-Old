
var pageLoader = context.app("pageLoader").use("bbext", "pageEditor", "pageSettings");


function pageLoaderStart(app) {
	
	app.render({
		parentEl: "#frame-body"
	});
	
}

pageLoader.start(["app", pageLoaderStart]);