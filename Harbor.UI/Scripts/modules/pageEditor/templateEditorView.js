/*

*/
pageEditor.templateEditorView = (function () {


	function templateEditorView(options, _, $, currentPageRepo, componentManager, pageUICMenu) {

		this.page = currentPageRepo.getCurrentPage();
		this.template = this.page.template;
		this.componentManager = componentManager;
		this.pageUICMenu = pageUICMenu;

		this.pageUICMenuView = null;
	}

	templateEditorView.prototype = {
		initialize: function () {
			this.listenTo(this.componentManager, "open", this.showUICMenu, this);
			this.listenTo(this.componentManager, "close", this.hideUICMenu, this);
		},
		
		events: {
			"click .uic": function () {
				var uicid = $(event.target).closest(".uic").attr("id");
				this.selectUIC(uicid);
			},
			
			"click .uic-add": function (event) {
				var type = $(event.target).closest(".page-content").length > 0 ? "content" : "aside";
				this.addComponent(type);
			}
		},

		render: function () {
			var self = this,
				asideEl = this.$(".page-aside"),
				contentEl = this.$(".page-content");

			asideEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
			contentEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
			asideEl.add(contentEl).sortable({
				handle: ".icon-move",
				items: ".uic",
				revert: false,
				containment: "document",
				tolerance: "pointer",
				update: this.updateOrder
			});
		},
		
		selectUIC: function (uicid) {
			this.componentManager.open(uicid);
		},
		
		showUICMenu: function (component) {
			this.pageUICMenuView = this.pageUICMenu.render({
				component: component
			});
			
			component.$el.append(this.pageUICMenuView.render().el);
			component.$el.addClass("selected");
		},
		
		hideUICMenu: function (component) {
			this.pageUICMenuView && this.pageUICMenuView.close();
			component.$el.removeClass("selected");
		},
		
		addComponent: function (type) {
			alert("add component");
			//var view = new PageEditor.AddComponentView({
			//	model: this.model,
			//	type: type
			//});
			//view.render();
		},
		
		updateOrder: function () {
			//var isContent, container, typeArray, newTypeArray;

			//isContent = true;
			//container = ui.item.closest(".page-content");
			//if (container.length === 0) {
			//	isContent = false;
			//	container = ui.item.closest(".page-aside");
			//}
			//typeArray = this.model.template.get(isContent ? "content" : "aside");
			//newTypeArray = [];
			//container.find(".uic").each(function (index, uicEl) {
			//	var uic;
			//	uicEl = $(uicEl);
			//	uic = _.find(typeArray, function (item) {
			//		return item.uicid === uicEl.attr("id");
			//	});
			//	newTypeArray.push(uic);
			//});

			//this.model.template.set(isContent ? "content" : "aside", newTypeArray);
			//AjaxRequest.handle(this.model.save());
		},
		
		close: function () {
			this.$(".uic-add").remove();
		}
	};


	return templateEditorView;
}());



pageEditor.view("templateEditorView", [
	"options", "_", "$", "currentPageRepo", "componentManager", "pageUICMenu",
	pageEditor.templateEditorView]);