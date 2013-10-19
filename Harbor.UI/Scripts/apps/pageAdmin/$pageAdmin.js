

var pageAdmin = context.app("pageAdmin").use(
	"pageModel", "bbext", "currentUserModel", "pageAdder"
);


function pageAdminStart(app) {

	app.render({
		regionEl: "#frame-body"
	});
}


pageAdmin.start(["app", pageAdminStart]);