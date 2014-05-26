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
		
		this.fromServer = true;
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
			this.listenTo(this.componentManager, "delete", this.deleteUIC, this);
			this.listenTo(this.componentManager, "create", this.createUIC, this);

			this.template.content.comparator = templateContentSort;
			this.template.aside.comparator = templateContentSort;
		},
		
		events: {
			"click .uic": function (event) {
				var uicid = $(event.target).closest(".uic").attr("id");
				uicid && this.selectUIC(uicid);
			},
			
			"click .uic-add": function (event) {
				var type = $(event.target).closest(".page-content").length > 0 ? "content" : "aside";
				this.addComponent(type);
			}
		},

		render: function () {
			var contentEl = this.$(".page-content");

			contentEl.append('<div class="uic-add"><span class="icon-plus"/></div>');
			contentEl.sortable({
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
		
		deleteUIC: function (component) {
			// jch* test
			component.$el.fadeOut();
		},
		
		addComponent: function (type) {
			this.addPageComponent.render({
				type: type
			});
		},
		
		createUIC: function (component) {
			var type, model = component.componentModel;

			component.$el.addClass("uic").hide();
			
			type = model.get("type");
			if (type === "content") {
				component.$el.addClass(model.get("classNames").join(" "));
				$(".page-content").find(".uic-add").before(component.$el);
			} else if (type === "aside") {
				$(".page-aside").find(".uic-add").before(component.$el);
			} else {
				$(".page-header").html(component.$el);
			}
			
			component.$el.fadeIn();
		},
		
		updateOrder: function (event, ui) {
			this.template.aside.sort();
			this.template.content.sort();
			this.currentPageRepo.saveCurrentPage();
		},
		
		onClose: function () {
			this.$(".uic-add").remove();
		}
	};


	function templateContentSort(model) {
		var index = $("#" + model.attributes.uicid).index();
		console.debug("model index", index);
		return index;
	}


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