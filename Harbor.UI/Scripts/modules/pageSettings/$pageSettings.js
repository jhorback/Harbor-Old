

var pageSettings = context.module("pageSettings").use(
	"bbext", "currentPageModel", "fileModel", "fileSelector", "pageSelector"
);


pageSettings.component("pageSettings", {
	region: "#frame-body"
});
