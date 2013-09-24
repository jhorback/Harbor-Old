

pageEditor.component("pageUICMenu");


pageEditor.pageUICMenuView = function (options, modelFactory, componentManager) {

	var type = options.component.type;

	this.component = options.component;
	this.componentManager = componentManager;
	
	this.model = modelFactory.createGeneric({		
		showChangeHeader: type === "header",
		showMove: type !== "header",
		showChangeLayout: type === "content",
		showRemove: type !== "header"
	});
};

pageEditor.pageUICMenuView.prototype = {
	changeHeader: function (event) {
		alert("change header");
		//var view = new PageEditor.AddComponentView({
		//	model: this.model,
		//	type: "header"
		//});
		//view.render();
	},

	removeComponent: function (event) {
		this.componentManager.remove(this.component.uicid);
		// PageEditor.deleteComponent(this.model, uicid);
	},
	
	changeLayout: function (uicid) {
		alert("change layout");
		//var view = new PageEditor.ChangeLayoutView({
		//	model: this.model,
		//	uicid: uicid
		//});
		//view.render();
	}
};


pageEditor.view("pageUICMenuView", [
	"options", "modelFactory", "componentManager", 
	pageEditor.pageUICMenuView])