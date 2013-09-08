

var pageEditor = context.module("pageEditor").use("bbext");



function pageEditorService () {
	return {
		render: function () {
			alert("pageeditor render");
		},
		
		close: function () {
			alert("pageeditor close");
		}
	};
}



pageEditor.service("pageEditor", [pageEditorService]);