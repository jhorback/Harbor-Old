

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
		this.saveContentOrder();
	},

	moveNext: function () {
		var thisUic = this.component.view.$el.closest(".uic"),
			nextUic = thisUic.next(".uic");
		
		if (nextUic.length === 0) {
			return;
		}

		nextUic.after(thisUic);
		this.saveContentOrder();
		return;
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
