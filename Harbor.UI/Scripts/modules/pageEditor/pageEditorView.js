/*
on edit view render:

loop through the components in the template and create a view for each one.


pageEditor.components


*/
pageEditor.pageEditorView = (function () {


	function pageEditorView(options, _, currentPageRepo) {

		this.page = currentPageRepo.getCurrentPage();
		this.template = this.page.template;

	}

	pageEditorView.prototype = {
		render: function () {
			// create the components and listeners
			


			_.each(this.template.aside, function (model) {

			}, this);
		},
		
		close: function () {
			// closes the components and listeners
		}
	};


	return pageEditorView;
}());



pageEditor.view("pageEditorView", [
	"options", "_", "currentPageRepo",
	pageEditor.pageEditorView]);