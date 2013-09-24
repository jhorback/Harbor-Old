

pageEditor.pageLinkView = function (options) {

	
};


pageEditor.pageLinkView.prototype = {
	initialize: function () {
		this.listenTo(this.model, "change:tileDisplay", this.save);
	},
	
	events: {
		"click [data-rel=select]": function () {
			this.openPageSelector();
		},
		"click a": function (event) {
			// prevent link navigation while editing
			event.preventDefault();
		}
	},
	
	render: function () {
		var editDiv =  this.template("PageLink-Edit")();
		var imgCtr = this.$("[data-rel=pageLink]");
		imgCtr.after(editDiv);
		this.bindModelToView();
	},
	
	renderPageLink: function () {
		if (this.model.hasPageLink() === false) {
			return;
		}
		this.renderTemplate("PageLink")(this.model.toJSON());
		this.render();
	},
	
	save: function () {
		AjaxRequest.handle(this.model.save(), {
			success: this.renderPageLink
		}, this);
	},

	openPageSelector: function () {
		PageSettings.events.trigger("modal:opened");
		PageSelector.start({
			region: PageEditor.regions.modal,
			close: function () {
				PageSettings.events.trigger("modal:closed");
			},
			select: function (selectedPage) {
				var pageID = selectedPage.get("id");
				this.model.set({
					pageID: pageID,
					title: selectedPage.get("title"),
					previewText: selectedPage.get("previewText"),
					previewImageID: selectedPage.get("previewImageID")
				});
				this.save();
			}
		}, this);
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};



pageEditor.view("pageLinkView", [
	"options",
	pageEditor.pageLinkView
]);