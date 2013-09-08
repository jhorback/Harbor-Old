

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

/*
jch* todo
on pageEditorView bind title to currentPage title.
*/


pageEditor.service("pageEditor", [pageEditorService]);