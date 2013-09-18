

var fileAdmin = context.app("fileAdmin").use(
	"fileModel", "bbext"
);


fileAdmin.start(["app", function (app) {

	app.render({
		regionEl: "#frame-body"
	});

}]);