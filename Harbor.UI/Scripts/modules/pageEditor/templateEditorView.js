

pageEditor.templateEditorView = function (
	options,
	currentPageRepo,
	componentManager,
	pageUICMenu,
	addPageComponent,
	templateRenderer,
	contentRowUpdater
) {
	this.fromServer = true;
	this.page = currentPageRepo.getCurrentPage();
	this.template = this.page.template;
	this.componentManager = componentManager;
	this.pageUICMenu = pageUICMenu;
	this.currentPageRepo = currentPageRepo;
	this.addPageComponent = addPageComponent;
	this.templateRenderer = templateRenderer;
	this.contentRowUpdater = contentRowUpdater;

	this.pageUICMenuView = null;
}


pageEditor.templateEditorView.prototype = {
	initialize: function () {
		this.listenTo(this.componentManager, "open", this.showUICMenu, this);
		this.listenTo(this.componentManager, "close", this.hideUICMenu, this);
		this.listenTo(this.componentManager, "delete", this.deleteUIC, this);
		this.listenTo(this.componentManager, "create", this.createUIC, this);

		this.template.content.comparator = this.templateContentSort;
		this.listenTo(this.template, "change:defaultContentClassName", this.updateAddClass);
		this.listenTo(this.template.content, "change:startsNewRow", this.updateContentRows);
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
		var contentEl = this.$(".page-content"),
			addTemplate = '<div class="uic-add"><span class="icon-plus"/>';
					   
		contentEl.addClass("page-content-edit");
		contentEl.append(addTemplate);
		this.contentRowUpdater.positionUicAddButton(contentEl, this.template);

		contentEl.sortable({
			handle: ".icon-move",
			items: ".uic",
			revert: false,
			containment: "document",
			tolerance: "pointer",
			update: _.bind(this.updateOrder, this),
			start: function (event, ui) {
				// clear is enforced by .row, remove those while dragging
				ui.item.closest(".page-content").find(".clear").removeClass("clear").addClass("was-clear-on-drag");
			},

			stop: function (event, ui) {
				ui.item.closest(".page-content").find(".was-clear-on-drag").removeClass("was-clear-on-drag").addClass("claer");
			}
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
		
	addComponent: function () {
		this.addPageComponent.render({
			parentPageTypeKey: this.page.attributes.pageTypeKey
		});
	},
		
	createUIC: function (component) {
		var type, model = component.componentModel;

		component.$el.addClass("uic").hide();
		component.$el.addClass(model.get("classNames").join(" "));
		$(".page-content").find(".uic-add").before(component.$el);
		component.$el.fadeIn();
	},

	deleteUIC: function (component) {
		component.$el.fadeOut();
	},
		
	updateOrder: function (event, ui) {
		this.contentRowUpdater.correctClearElements(this.$(".page-content"));
		this.template.content.sort();
		this.currentPageRepo.saveCurrentPage();
	},

	templateContentSort: function (model) {
		var index = $("#" + model.attributes.uicid).index();
		//console.debug("model index", index,  model.attributes);
		return index;
	},

	updateContentRows: function () {
		this.contentRowUpdater.correctRows(this.$(".page-content"), this.template);
	},
		
	onClose: function () {
		this.templateContentView && this.templateContentView.close();
		this.$(".page-content").removeClass("page-content-edit");
		this.$(".uic-add").remove();
	}
};



pageEditor.view("templateEditorView", [
	"options",
	"currentPageRepo",
	"componentManager",
	"pageUICMenu",
	"addPageComponent",
	"templateRenderer",
	"contentRowUpdater",
	pageEditor.templateEditorView
]);