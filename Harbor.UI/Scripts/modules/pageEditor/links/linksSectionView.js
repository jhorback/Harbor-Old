

pageEditor.linksSectionView = function (
	options,
	pageSelector,
	feedback,
	commandHandler
) {
	this.pageSelector = pageSelector;
	this.feedback = feedback;
	this.commandHandler = commandHandler;
};


pageEditor.linksSectionView.prototype = {
	initialize: function () {
		this.bindAll("updateOrder", "selectPage");
	},
	
	onRender: function () {
		this.$el.sortable({
			handle: ".icon-reorder",
			items: "[data-collection=links]",
			revert: false,
			containment: this.$el.find("ul"),
			tolerance: "pointer",
			update: this.updateOrder
		});
	},
	
	updateOrder: function () {
		this.model.links.sort();
	},
	
	removeSection: function (event) {
		if (confirm("Are you sure you want to remove this section of links?")) {
			this.model.collection.remove(this.model);
		}
	},

	addLink: function (event) {
		this.pageSelector.render({
			createPage: false,
			allowPageAdd: true,
			layoutPageTypeKey: this.model.collection.page.attributes.pageTypeKey,
			onAddPage: this.addPage,
			select: this.selectPage
		});
	},

	selectPage: function (selectedPage) {
		if (selectedPage.isNew()) {
			this.addNewPage(selectedPage);
		} else {
			this.addExistingPage(selectedPage);
		}
	},

	addNewPage: function (pageToAdd) {
		var thisPage = this.model.collection.page,
		    wait = this.feedback.wait("Adding page...");

		this.commandHandler.execute(thisPage, "addNewPageToLinks", {
			title: pageToAdd.get("title"),
			pageType: pageToAdd.get("pageTypeKey"),
			sectionIndex: this.model.collection.indexOf(this.model)
		}, {
			// handler
			clientError: function (error) {
				var errorMessage = "<h1>" + error.errors[""].toString() +
					"</h1><p>" + "Try adding the page again.</p>";
				wait.finished(errorMessage);
			},
			success: wait.finishedMessage()
		}, this);
	},

	addExistingPage: function (pageToAdd) {
		var thisPage = this.model.collection.page,
			wait = this.feedback.wait("Adding page...");

		this.commandHandler.execute(thisPage, "addExistingPageToLinks", {
			existingPageID: pageToAdd.id,
			sectionIndex: this.model.collection.indexOf(this.model)
		}, this).then(wait.finishedMessage());
	}
};


pageEditor.view("linksSectionView", [
	"options",
	"pageSelector",
	"feedback",
	"commandHandler",
	pageEditor.linksSectionView
]);