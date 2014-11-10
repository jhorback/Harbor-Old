

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
		alert("Move previous");
	},

	moveNext: function () {
		alert("Move next");
	}
};


pageEditor.view("pageUICMenuView", [
	"options",
	"currentPageRepo",
	"changeLayout",
	"commandHandler",
	pageEditor.pageUICMenuView
]);
