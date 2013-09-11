
var fileSelector = context.module("fileSelector").use("bbext", "fileModel");

fileSelector.start(["app", function (app) {

	app.render({
		regionEl: "#frame-body"
	});

}]);