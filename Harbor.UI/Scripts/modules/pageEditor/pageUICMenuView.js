

pageEditor.component("pageUICMenu");


pageEditor.pageUICMenuView = function (options, modelFactory, componentManager, currentPageRepo, changeLayout) {

	this.component = options.component;
	this.componentManager = componentManager;
	this.currentPageRepo = currentPageRepo;
	this.currentPage = currentPageRepo.getCurrentPage();
	this.changeLayoutComponent = changeLayout;
};

pageEditor.pageUICMenuView.prototype = {
	removeComponent: function (event) {
		var pageComponent, collection;
		
		if (confirm("Are you sure you want to delete this content?")) {
			collection = this.currentPage.template.content;

			this.componentManager.deleteComponent(this.component.uicid);
			pageComponent = collection.get(this.component.uicid);
			collection.remove(pageComponent);
			this.currentPageRepo.saveCurrentPage();
		}
	},
	
	changeLayout: function (event) {
		this.changeLayoutComponent.render({
			uicid: this.component.uicid
		});
	}
};


pageEditor.view("pageUICMenuView", [
	"options", "modelFactory", "componentManager", "currentPageRepo", "changeLayout",
	pageEditor.pageUICMenuView]);
