
// type, $el, uicid, page
var ImageComponent = PageComponent.extend({
	
    modelType: function () {
        return ImageComponent.ImageModel;
    },

    initialize: function () {
        this.view = new ImageComponent.View({
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


ImageComponent.ImageModel = Application.Model.extend({
	pageProperties: {
		fileID: null,
		ext: null,
		name: null,
		max: 500
	},
	defaults: {
		imgSrc: null,
		maxClass: null
	},
	hasImage: function () {
		return this.get("fileID") ? true : false;
	},
	imgSrc: {
		get: function (value) {
			return Application.url("file/" +
				this.get("fileID") + "/" + this.get("name") + "." +
				this.get("ext") + "?max=" + this.get("max"));
		}
	},
	maxClass: {
		get: function (value) {
			return "max-" + (this.get("max") || 500);
		}
	}
});


ImageComponent.View = Application.View.extend({
	initialize: function () {
		this.listenTo(this.model, "change:max", this.save);
	},
	
	events: {
		"click [data-rel=select]": function () {
			this.openFileSelector();
		}
	},
	
	render: function () {
		var editDiv =  this.template("Image-Edit")();
		var imgCtr = this.$("[data-rel=image]");
		imgCtr.after(editDiv);
		this.bindModelToView();
	},
	
	renderImage: function () {
		if (this.model.hasImage() === false) {
			return;
		}
		this.renderTemplate("Image")(this.model.toJSON());
		this.render();
	},
	
	save: function () {
		AjaxRequest.handle(this.model.save(), {
			success: this.renderImage
		}, this);
	},

	openFileSelector: function () {
		PageEditor.regions.page.hideEl();
		PageLoader.regions.loader.hideEl();
		FileSelector.start({
			filter: "images",
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
				this.model.page.updatePagePreviewImage(this.options.uicid, fileID);
				this.save();
			}
		}, this);
	},
	
	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
});



PageEditor.registerComponent("image", ImageComponent);