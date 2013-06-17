
var pageLink = module("pageLink").use("pageComponent", "bbext");


pageLink.component("pageLink", function (viewFactory) {

	this.view = viewFactory.create("pageLinkView", {
		el: this.$el,
		model: this.model,
		uicid: this.uicid
	});

}, {
	$inject: ["viewFactory"],
	
    modelType: "pageLinkModel",

    initialize: function () {
        
    },

	create: function () {
	    this.open();
	    this.view.openPageSelector();
	},
	
	open: function () {
		this.view.render();
	},
	
	close: function () {
		this.view.close();
	}
});

pageLink.model("pageLinkModel", {
	component:  {
		pageProperties: ["pageID", "tileDisplay"],
	
		getDefaults: function (page, pageProperties) {
			return _.pick(page.getPageLink(pageProperties.pageID),
				"title", "previewText", "previewImageID", "link");
		}
	},
	
	defaults: {
		pageID: 0,
		tileDisplay: "normal",
		title: null,
		previewText: null,
		previewImageID: null,
		previewImageSrc: null,
		tileClassName: "tile",
		link: null
	},
	
	hasPageLink: function () {
		return this.get("pageID") > 0 ? true : false;
	},
	
	previewImageSrc: {
		get: function (value) {
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


pageLink.view("pageLinkView", {
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
});