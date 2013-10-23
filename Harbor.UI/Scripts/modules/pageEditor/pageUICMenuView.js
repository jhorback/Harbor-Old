

pageEditor.component("pageUICMenu");


pageEditor.pageUICMenuView = function (options, modelFactory, componentManager, currentPageRepo, changeLayout) {

	var type = options.component.type;

	this.component = options.component;
	this.componentManager = componentManager;
	this.currentPageRepo = currentPageRepo;
	this.currentPage = currentPageRepo.getCurrentPage();
	this.changeLayoutComponent = changeLayout;
	
	this.model = modelFactory.createGeneric({		
		showChangeHeader: type === "header",
		showMove: type !== "header",
		showChangeLayout: type === "content",
		showRemove: type !== "header"
	});
};

pageEditor.pageUICMenuView.prototype = {
	changeHeader: function (event) {
		alert("The title component cannot currently be changed.");
		//var view = new PageEditor.AddComponentView({
		//	model: this.model,
		//	type: "header"
		//});
		//view.render();
	},

	removeComponent: function (event) {
		var type, pageComponent, collection;
		
		if (confirm("Are you sure you want to delete this content?")) {
			type = this.component.type;

			collection = type === "aside" ? this.currentPage.template.aside :
				this.currentPage.template.content;

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
