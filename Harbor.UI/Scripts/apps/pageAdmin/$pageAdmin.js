

var pageAdmin = context.app("pageAdmin").use(
	"pageModel", "bbext", "currentUserModel", "pageAdder"
);


function pageAdminStart(app, pageAdminRouter) {

	app.render({
		regionEl: "#frame-body"
	});
	
	pageAdminRouter.start();
}


pageAdmin.start(["app", "pageAdminRouter", pageAdminStart]);