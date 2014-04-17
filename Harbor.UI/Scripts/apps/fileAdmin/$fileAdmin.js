
// todaysAlbumName
var fileAdmin = context.app("fileAdmin").use(
	"fileModel", "bbext"
);


fileAdmin.start(["app", "fileAdminRouter", "appurl", function (app, fileAdminRouter) {

	app.render({
		region: "#frame-body"
	});

	fileAdminRouter.start();
	
}]);