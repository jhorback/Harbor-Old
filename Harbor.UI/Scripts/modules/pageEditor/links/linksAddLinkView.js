

pageEditor.linksAddLinkView = function (options, pageSelector, pageAdder, dialogFactory, commandHandler) {

	this.pageSelector = pageSelector;
	this.pageAdder = pageAdder;
	this.dialogFactory = dialogFactory;
	this.commandHandler = commandHandler;
};

pageEditor.linksAddLinkView.prototype = {
	initialize: function () {
		this.bindAll("addNewPage", "addExistingPage", "addPage", "selectPage");
		// this.model.collection.page -> page
	},

	onRender: function () {
		this.dialog = this.dialogFactory.create(this.$el, {
			title: "Add a link",
			modal: false
		});
	},

	addNewPage: function () {
		//this.close();
		this.pageAdder.render({
			addPage: this.addPage
		});
	},

	addExistingPage: function () {
		//this.close();
		this.pageSelector.render({
			select: this.selectPage
		});
	},

	addPage: function (pageToAdd) {

		var thisPage = this.model.collection.page;

		this.pageAdder.close();
		this.commandHandler.execute(thisPage, "addNewPageToLinks", {
			title: pageToAdd.get("title"),
			pageType: pageToAdd.get("pageTypeKey"),
			sectionIndex: this.model.collection.indexOf(this.model)
		}, {
			// handler
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);
	},

	selectPage: function (page) {
		/*
		public int ExistingPageID { get; set; }
		public int SectionIndex { get; set; }*/
		alert("select page");
		console.debug(page);
	},

	onClose: function () {
		this.dialog && this.dialog.close();
	}
};

	//this.model.links.add({
	//		pageID: page.get("id"),
	//		text: page.get("title")
	//	});

pageEditor.view("linksAddLinkView", [
	"options",
	"pageSelector",
	"pageAdder",
	"dialogFactory",
	"commandHandler",
	pageEditor.linksAddLinkView
]);


