

pageEditor.linksAddLinkView = function (
	options, 
	pageSelector, 
	pageAdder, 
	dialogFactory, 
	commandHandler, 
	feedback
) {
	this.pageSelector = pageSelector;
	this.pageAdder = pageAdder;
	this.dialogFactory = dialogFactory;
	this.commandHandler = commandHandler;
	this.feedback = feedback;
};

pageEditor.linksAddLinkView.prototype = {
	initialize: function () {
		this.bindAll("addNewPage", "addExistingPage", "addPage", "selectPage");
	},

	onRender: function () {
		this.dialog = this.dialogFactory.create(this.$el, {
			title: "Add a link"
		});
	},

	addNewPage: function () {
		this.close();
		this.pageAdder.render({
			addPage: this.addPage
		});
	},

	addExistingPage: function () {
		this.close();
		this.pageSelector.render({
			select: this.selectPage
		});
	},

	addPage: function (pageToAdd) {

		var thisPage = this.model.collection.page,
		    wait = this.feedback.wait("Adding page...");

		this.pageAdder.close();

		this.commandHandler.execute(thisPage, "addNewPageToLinks", {
			title: pageToAdd.get("title"),
			pageType: pageToAdd.get("pageTypeKey"),
			sectionIndex: this.model.collection.indexOf(this.model)
		}, {
			// handler
			clientError: function (error) {
				wait.finished(error.errors[""].toString());
				alert(error.errors[""].toString());
			},
			success: wait.finishedMessage()
		}, this);
	},

	selectPage: function (selectedPage) {
		var thisPage = this.model.collection.page,
			wait = this.feedback.wait("Adding page...");

		this.commandHandler.execute(thisPage, "addExistingPageToLinks", {
			existingPageID: selectedPage.id,
			sectionIndex: this.model.collection.indexOf(this.model)
		}, this).then(wait.finishedMessage());
	},

	onClose: function () {
		this.dialog && this.dialog.close();
	}
};


pageEditor.view("linksAddLinkView", [
	"options",
	"pageSelector",
	"pageAdder",
	"dialogFactory",
	"commandHandler",
	"feedback",
	pageEditor.linksAddLinkView
]);


