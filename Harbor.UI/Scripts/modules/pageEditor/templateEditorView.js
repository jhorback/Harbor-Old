

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
		this.template.content.sort();
		this.currentPageRepo.saveCurrentPage();
	},

	templateContentSort: function (model) {
		var index = $("#" + model.attributes.uicid).index();
		//console.debug("model index", index,  model.attributes);
		return index;
	},

	updateContentRows: function () {
		this.contentRowUpdater.update(this.$(".page-content"), this.template);
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








pageEditor.contentRowUpdater = function (console) {
	var rowTemplate = '<div class="row"/>';
	
	return {
		update: function (pageContentEl, pageTemplate) {
			if (needsUpdate(pageContentEl)) {
				reWrapRows(pageContentEl);
				this.positionUicAddButton(pageContentEl, pageTemplate);
			}
		},

		positionUicAddButton: function (pageContentEl, pageTemplate) {
			var uicAddButton = pageContentEl.find(".uic-add");
			pageTemplate.attributes.prependContentByDefault ?
				pageContentEl.find(".row:first").prepend(uicAddButton.detach()) :
				pageContentEl.find(".row:last").append(uicAddButton.detach());
		}
	};


	function reWrapRows(pageContentEl) {
		var uics = pageContentEl.find(".uic"),
			currentRow;

		console.info("REWRAP ROWS");
		
		//	unwrap all rows then loop through all content and put them in rows
		uics.unwrap();
		
		currentRow = $(rowTemplate).appendTo(pageContentEl);
		$.each(uics, function (index, uic) {
			uic = $(uic);
			if (index !== 0 && uic.hasClass("clear") === true) {
				currentRow = $(rowTemplate).appendTo(pageContentEl);
			}
			currentRow.append(uic.detach()); 
		});
	
		// need to also move the uic-add guy		
	}

	
	function needsUpdate(pageContentEl) {
		var clearUics, rows,
		    allClearUicsAreFirst = true,
		    allRowsStartWithAClear = true;

		// all uic's with a clear class are first
		clearUics = pageContentEl.find(".uic.clear");
		clearUics.each(function (index, uic) {
			uic = $(uic);
			if (uic.index() !== 0) {
				console.info("CONTENT ROWS NEED UPDATE: Clear UIC is not first. UICID: ", uic.attr("id"));
				allClearUicsAreFirst = false;
				return false;
			}
			return true;
		});
		
		if (allClearUicsAreFirst === false) {
			return true;
		}

		// all rows (except first) have the first uic with a clear class
		rows = pageContentEl.find(".row");
		rows.each(function (index, row) {
			row = $(row);
			if (index > -1 && row.find(".uic:first-child").hasClass("clear") === false) {
				console.info("CONTENT ROWS NEED UPDATE: Row does not have a clear first-child. Row Index: ", index);
				allRowsStartWithAClear = false;
				return false;
			}
			return true;
		});

		return allRowsStartWithAClear === false;
	}
};


pageEditor.service("contentRowUpdater", [
	"console",
	pageEditor.contentRowUpdater
]);