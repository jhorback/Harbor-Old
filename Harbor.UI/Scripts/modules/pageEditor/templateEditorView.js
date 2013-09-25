/*

*/
pageEditor.templateEditorView = (function () {

	var $, _;

	function templateEditorView(
		options,
		__,
		$$,
		currentPageRepo,
		componentManager,
		pageUICMenu,
		addPageComponent) {
		$ = $$;
		_ = __;
		
		this.page = currentPageRepo.getCurrentPage();
		this.template = this.page.template;
		this.componentManager = componentManager;
		this.pageUICMenu = pageUICMenu;
		this.currentPageRepo = currentPageRepo;
		this.addPageComponent = addPageComponent;

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
			var asideEl = this.$(".page-aside"),
				contentEl = this.$(".page-content");

			asideEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
			contentEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
			asideEl.add(contentEl).sortable({
				handle: ".icon-move",
				items: ".uic",
				revert: false,
				containment: "document",
				tolerance: "pointer",
				update: _.bind(this.updateOrder, this)
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
			this.addPageComponent.render({
				type: type
			});
		},
		
		updateOrder: function (event, ui) {
			var isContent, container, typeArray, newTypeArray;

			isContent = true;
			container = ui.item.closest(".page-content");
			if (container.length === 0) {
				isContent = false;
				container = ui.item.closest(".page-aside");
			}
			
			typeArray = this.template.get(isContent ? "content" : "aside");
			newTypeArray = [];
			container.find(".uic").each(function (index, uicEl) {
				var uic;
				uicEl = $(uicEl);
				uic = _.find(typeArray, function (item) {
					return item.uicid === uicEl.attr("id");
				});
				newTypeArray.push(uic);
			});

			this.template.set(isContent ? "content" : "aside", newTypeArray);
			this.currentPageRepo.saveCurrentPage();
		},
		
		close: function () {
			this.$(".uic-add").remove();
		}
	};


	return templateEditorView;
}());



pageEditor.view("templateEditorView", [
	"options",
	"_",
	"$",
	"currentPageRepo",
	"componentManager",
	"pageUICMenu",
	"addPageComponent",
	pageEditor.templateEditorView]);