
// todaysAlbumName
var fileAdmin = context.app("fileAdmin").use(
	"fileModel", "bbext"
);


fileAdmin.start(["fileAdminRouter", "appurl", function (fileAdminRouter) {

	//app.render({
	//	region: "#frame-body"
	//});

	fileAdminRouter.start();
	
}]);