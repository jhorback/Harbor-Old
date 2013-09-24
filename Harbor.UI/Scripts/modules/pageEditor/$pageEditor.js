

var pageEditor = context.module("pageEditor").use("bbext");


function pageEditorService($, console, componentManager, viewRenderer) {

	var templateEditorView;

	return {
		render: function () {
			var frameBody = $("#frame-body");
			
			componentManager.init();
			templateEditorView = viewRenderer.render("templateEditorView", {
				el: frameBody[0]
			});
			console.log("pageEditor: render");
		},
		
		
		close: function () {
			componentManager.removeAll();
			templateEditorView && templateEditorView.close();
			console.log("pageEditor: close");
		}
	};
}



pageEditor.service("pageEditor", [
	"$", "console", "componentManager", "viewRenderer",
	pageEditorService]);