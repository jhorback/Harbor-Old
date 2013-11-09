

var pageEditor = context.module("pageEditor").use(
	"bbext", "currentPageModel", "payPalButtonModel", "currentUserModel");


function pageEditorService($, console, componentManager, viewRenderer) {

	var templateEditorView,
		rendered = false;

	return {
		render: function () {
			var frameBody;
			
			if (rendered) {
				return;
			}

			frameBody = $("#frame-body");
			componentManager.init();
			templateEditorView = viewRenderer.render("templateEditorView", {
				el: frameBody[0]
			});
			rendered = true;
			console.log("pageEditor: render");
		},
		
		
		close: function () {
			componentManager.removeAll();
			templateEditorView && templateEditorView.close();
			rendered = false;
			console.log("pageEditor: close");
		}
	};
}



pageEditor.service("pageEditor", [
	"$", "console", "componentManager", "viewRenderer",
	pageEditorService]);