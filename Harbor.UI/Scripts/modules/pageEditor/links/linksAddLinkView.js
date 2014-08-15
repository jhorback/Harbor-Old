

pageEditor.linksAddLinkView = function (options, pageSelector, pageAdder, dialogFactory) {

	this.pageSelector = pageSelector;
	this.pageAdder = pageAdder;
	this.dialogFactory = dialogFactory;
};

pageEditor.linksAddLinkView.prototype = {
	initialize: function () {
		this.bindAll("addNewPage", "addExistingPage");

		console.log(this.model);
	},

	onRender: function () {
		this.dialog = this.dialogFactory.create(this.$el, {
			title: "Add a link",
			modal: true
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

	addPage: function (page) {
		alert("add page");
		console.debug(page);
	},

	selectPage: function (page) {
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
	pageEditor.linksAddLinkView
]);