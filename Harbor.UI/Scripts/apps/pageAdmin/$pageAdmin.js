﻿

var pageAdmin = context.app("pageAdmin").use(
	"pageModel", "bbext", "currentUserModel", "pageAdder"
);


pageAdmin.start(["app", function (app) {

	app.regionEl = "#frame-body";
	app.render();

}]);