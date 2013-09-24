/*

*/
pageEditor.templateEditorView = (function () {


	function templateEditorView(options, _, $, currentPageRepo, componentManager) {

		this.page = currentPageRepo.getCurrentPage();
		this.template = this.page.template;
		this.componentManager = componentManager;

	}

	templateEditorView.prototype = {
		initialize: function () {
			this.listenTo(this.componentManager, "all", function () {
				console.log("TESTING componantManager:", arguments);
			});
		},
		
		events: {
			"click .uic": function () {
				var uicid = $(event.target).closest(".uic").attr("id");
				this.selectUIC(uicid);
			}
		},

		render: function () {
			
		},
		
		selectUIC: function (uicid) {
			this.componentManager.open(uicid);
			
			//if (this.selectedUICEl) {
			//	if (this.selectedUICEl === uic) {
			//		return;
			//	}
			//	this.hideCtrl(this.selectedUICEl);
			//}
			//this.selectedUICEl = uic;
			//this.showCtrl(uic);
			//PageEditor.openComponent(uic.attr("id"));
		},
		
		close: function () {
			
		}
	};


	return templateEditorView;
}());



pageEditor.view("templateEditorView", [
	"options", "_", "$", "currentPageRepo", "componentManager",
	pageEditor.templateEditorView]);