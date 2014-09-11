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
			this.template.on("change:defaultContentClassName", this.updateAddClass, this);
		},
		
		events: {
			"click .uic": function (event) {
				var uicid = $(event.target).closest(".uic").attr("id");
				uicid && this.selectUIC(uicid);
			},
			
			"click .uic-add": function (event) {
				this.addComponent();
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

			this.updateAddClass();
		},

		updateAddClass: function () {
			var defaultClassName = this.template.attributes.defaultContentClassName || "clear";
			this.$(".uic-add").attr("class", "uic-add " + defaultClassName);
		},
		
		selectUIC: function (uicid) {
			this.componentManager.open(uicid);
		},
		
		showUICMenu: function (component) {
			if (!component || component.type !== "content") {
				return;
			}

			this.pageUICMenuView = this.pageUICMenu.render({
				component: component
			});
			
			component.$el.append(this.pageUICMenuView.render().el);
			component.$el.addClass("selected");
		},
		
		hideUICMenu: function (component) {
			if (!component || component.type !== "content") {
				return;
			}
			this.pageUICMenuView && this.pageUICMenuView.close();
			component.$el.removeClass("selected");
		},
		
		deleteUIC: function (component) {
			// jch* test
			component.$el.fadeOut();
		},
		
		addComponent: function () {
			this.addPageComponent.render();
		},
		
		createUIC: function (component) {
			var type, model = component.componentModel;

			component.$el.addClass("uic").hide();
			component.$el.addClass(model.get("classNames").join(" "));
			$(".page-content").find(".uic-add").before(component.$el);
			component.$el.fadeIn();
		},
		
		updateOrder: function (event, ui) {
			this.template.content.sort();
			this.currentPageRepo.saveCurrentPage();
		},
		
		onClose: function () {
			this.$(".uic-add").remove();
		}
	};


	function templateContentSort(model) {
		var index = $("#" + model.attributes.uicid).index();
		//console.debug("model index", index,  model.attributes);
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