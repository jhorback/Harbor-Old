
// type, $el, uicid, page
var PageLinkComponent = PageComponent.extend({
	
    modelType: function () {
        return PageLinkComponent.PageLinkModel;
    },

    initialize: function () {
        this.view = new PageLinkComponent.View({
            el: this.$el,
            model: this.model,
            uicid: this.uicid
        });
    },

	create: function () {
	    this.open();
	    this.view.openPageSelector();
	},
	
	open: function () {
		JSPM.install("PageSelector", function () {
			this.view.render();
		}, this);
	},
	
	close: function () {
		this.view.close();
	}
});


PageLinkComponent.PageLinkModel = Application.Model.extend({
	pageProperties: {
		pageID: 0,
		tileDisplay: "normal"
	},
	defaults: {
		title: null,
		previewText: null,
		previewImageID: null,
		previewImageSrc: null,
		tileClassName: "tile"
	},
	hasPageLink: function () {
		return this.get("pageID") > 0 ? true : false;
	},
	previewImageSrc: {
		get: function (value) {
			debugger;
			var src = Application.url("file/" +
				this.get("previewImageID") + "/preview.img?res=low");
			return src;
		}
	},
	tileClassName: {
		get: function (value) {
			var display = this.get("tileDisplay");
			return display === "wide" ? "tile tile-wide" : "tile";
		}
	}
});


PageLinkComponent.View = Application.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change:tileDisplay", this.save);
	},
	
	events: {
		"click [data-rel=select]": function () {
			this.openPageSelector();
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
});

PageEditor.registerComponent("pageLink", PageLinkComponent);