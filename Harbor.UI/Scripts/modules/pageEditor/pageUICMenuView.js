

pageEditor.component("pageUICMenu");


pageEditor.pageUICMenuView = function (
	options,
	currentPageRepo,
	changeLayout,
	commandHandler,
	componentManager
) {
	this.component = options.component;
	this.currentPageRepo = currentPageRepo;
	this.currentPage = currentPageRepo.getCurrentPage();
	this.changeLayoutComponent = changeLayout;
	this.commandHandler = commandHandler;
	this.componentManager = componentManager;
};

pageEditor.pageUICMenuView.prototype = {
	initialize: function () {
		this.bindAll("onKeyDown");

		this.moveNext = _.throttle(this.moveNext, 500);	
		this.movePrevious = _.throttle(this.movePrevious, 500);	
	},

	onRender: function () {
		$(document).off("keydown.pageUICMenu-" + this.component.uicid);
		$(document).on("keydown.pageUICMenu-" + this.component.uicid, this.onKeyDown);	
	},

	onClose: function () {
		$(document).off("keypress.pageUICMenu-" + this.component.uicid);	
	},

	onKeyDown: function (event) {
		// don't act on keystrokes from within a .uic
		if ($(event.target).closest(".uic").length > 0) {
			return;
		}

		if (event.which == 37) {
			this.movePrevious();
		} else if (event.which == 39) {	
			this.moveNext();
		}
	},

	removeComponent: function (event) {
		if (confirm("Are you sure you want to delete this content?")) {
			this.commandHandler.execute(this.currentPage, "deleteTemplateContent", {
				uicid: this.component.uicid
			});
		}
	},
	
	changeLayout: function (event) {
		this.changeLayoutComponent.render({
			uicid: this.component.uicid
		});
	},

	movePrevious: function () {
		var thisUic = this.component.view.$el.closest(".uic"),
			nextUic = thisUic.prev(".uic");
		
		if (nextUic.length === 0) {
			return;
		}

		nextUic.before(thisUic);
		this.updateClearElement();
		this.saveContentOrder();
	},

	moveNext: function () {
		var thisUic = this.component.view.$el.closest(".uic"),
			nextUic = thisUic.next(".uic");
		
		if (nextUic.length === 0) {
			return;
		}

		nextUic.after(thisUic);
		this.updateClearElement();
		this.saveContentOrder();
		return;
	},

	updateClearElement: function () {
		var row = this.component.view.$el.closest(".row"),
		    clearUicEl = row.find(".clear"),
		    firstUicEl = row.find(".uic:first-child"),
		    clearUic,
		    firstUic,
		    firstUicClassNames;

		if (clearUicEl.attr("id") === firstUicEl.attr("id")) {
			return;
		}


		clearUicEl.removeClass("clear");
		clearUic = this.componentManager.getComponentById(clearUicEl.attr("id"));
		clearUic && clearUic.model.set("classNames", _.without(clearUic.model.attributes.classNames, "clear"));


		firstUicEl.addClass("clear");
		firstUic = this.componentManager.getComponentById(firstUicEl.attr("id"));
		if (firstUic) {
			firstUicClassNames = _.without(firstUic.model.attributes.classNames, "clear");
			firstUicClassNames.push("clear");
			firstUic.model.attributes.classNames.push("clear")
			firstUic.model.set("classNames", firstUicClassNames);
		}
	},

	saveContentOrder: function () {
		this.currentPage.template.content.sort();
		this.currentPageRepo.saveCurrentPage();
	}
};


pageEditor.view("pageUICMenuView", [
	"options",
	"currentPageRepo",
	"changeLayout",
	"commandHandler",
	"componentManager",
	pageEditor.pageUICMenuView
]);
