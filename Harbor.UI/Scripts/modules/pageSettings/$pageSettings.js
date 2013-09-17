

var pageSettings = context.module("pageSettings").use(
	"bbext", "currentPageModel", "fileModel", "fileSelector"
);


pageSettings.component("pageSettings", {
	// regionEl: "#frame-body",
	defaultOptions: {
		container: "#frame-body"
	}
});
