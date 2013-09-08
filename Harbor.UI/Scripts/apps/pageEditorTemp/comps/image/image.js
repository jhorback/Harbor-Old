
var image = module("image").use("pageComponent", "bbext");

image.pageComponent("image", function (viewFactory) {
	
	this.view = viewFactory.create("imageView", {
		el: this.$el,
		model: this.model,
		uicid: this.uicid
	});
	
}, {
	$inject: ["viewFactory"],
	
    modelType: "imageModel",

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


image.model("imageModel", {
	component: {
		pageProperties: ["fileID", "res"],
	
		getDefaults: function () {
			return {};
		}
	},
	
	defaults: {
		fileID: null,	
		res: "low", // can be low or high
		imgSrc: null,
		ext: null,
		name: null
	},
	hasImage: function () {
		return this.get("fileID") ? true : false;
	},
	imgSrc: {
		get: function (value) {
			return Application.url("file/" +
				this.get("fileID") + "/" + this.get("name") + "." +
				this.get("ext") + "?res=" + this.get("res"));
		}
	},
	ext: {
		get: function (value) {
			return value;
		}
	}
});


image.view("imageView", function (options, jstViewExtension, modelBinderExtension) {
	
	jstViewExtension.extend(this);
	modelBinderExtension.extend(this);
	
}, {
	$inject:["options", "jstViewExtension", "modelBinderExtension"],
	initialize: function () {
		this.listenTo(this.model, "change:res", this.save);
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
		PageSettings.events.trigger("modal:opened");
		FileSelector.start({
			filter: "images",
			region: PageEditor.regions.modal,
			close: function () {
				PageSettings.events.trigger("modal:closed");
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