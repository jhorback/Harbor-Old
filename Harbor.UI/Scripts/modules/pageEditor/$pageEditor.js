

var pageEditor = context.module("pageEditor").use(
	"bbext", "currentPageModel", "payPalButtonModel", "currentUserModel", "pageAdder");


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
			}, {
			    fromServer: true
			});
			rendered = true;
			console.log("pageEditor: render");

			// remove the no title so the title can be edited
			frameBody.find(".has-notitle").removeClass("has-notitle");
		},
		
		
		close: function () {
			componentManager.destroy();
			templateEditorView && templateEditorView.close();
			rendered = false;
			console.log("pageEditor: close");
		}
	};
}



pageEditor.service("pageEditor", [
	"$", "console", "componentManager", "viewRenderer",
	pageEditorService]);