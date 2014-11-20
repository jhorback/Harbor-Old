

pageEditor.component("pageUICMenu");


pageEditor.pageUICMenuView = function (
	options,
	currentPageRepo,
	changeLayout,
	commandHandler
) {
	this.component = options.component;
	this.currentPageRepo = currentPageRepo;
	this.currentPage = currentPageRepo.getCurrentPage();
	this.changeLayoutComponent = changeLayout;
	this.commandHandler = commandHandler;
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
		var row = this.component.view.$el.closest(".row");
		row.find(".clear").removeClass("clear");
		row.find(".uic:first-child").addClass("clear"); 
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
	pageEditor.pageUICMenuView
]);
