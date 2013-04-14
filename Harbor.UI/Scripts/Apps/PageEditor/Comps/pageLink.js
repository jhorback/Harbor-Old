
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
	    this.view.openFileSelector();
	},
	
	open: function () {
		JSPM.install("FileSelector", function () {
			this.view.render();
		}, this);
	},
	
	close: function () {
		this.view.close();
	}
});


PageLinkComponent.PageLinkModel = Application.Model.extend({
	pageProperties: {
		fileID: null,
		ext: null, // jch! can remove ext and name after Page/File Relation is worked out
		name: null,
		res: "low" // can be low or high
	},
	defaults: {
	    imgSrc: null
	},
	hasPageLink: function () {
		return this.get("fileID") ? true : false;
	},
	imgSrc: {
		get: function (value) {
			return Application.url("file/" +
				this.get("fileID") + "/" + this.get("name") + "." +
				this.get("ext") + "?res=" + this.get("res"));
		}
	}
});


PageLinkComponent.View = Application.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change:res", this.save);
	},
	
	events: {
		"click [data-rel=select]": function () {
			this.openFileSelector();
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

	openFileSelector: function () {
		PageEditor.regions.page.hideEl();
		PageLoader.regions.loader.hideEl();
		FileSelector.start({
			filter: "pageLinks",
			region: PageEditor.regions.modal,
			close: function () {
				PageEditor.regions.page.showEl();
				PageLoader.regions.loader.showEl();
			},
			select: function (selectedFile) {
				var fileID = selectedFile.get("id");
				this.model.set({
					fileID: fileID,
					ext: selectedFile.get("ext"),
					name: selectedFile.get("name")
					// dont include max since we are saving on max change too
				});
				this.model.page.updatePagePreviewPageLink(this.options.uicid, fileID);
				this.save();
			}
		}, this);
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
});



PageEditor.registerComponent("pageLink", PageLinkComponent);