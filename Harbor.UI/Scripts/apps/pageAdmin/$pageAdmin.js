var pageAdmin = context.app("pageAdmin").use("pageModel", "bbext");


pageAdmin.start(["app", function (app) {

	app.el = "#frame-body";
	app.render();

}]);