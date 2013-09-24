

pageEditor.imageEditView = function (options, jstViewExtension, modelBinderExtension) {

	jstViewExtension.extend(this);
	modelBinderExtension.extend(this);

};


pageEditor.imageEditView.prototype = {
	
	initialize: function () {
		this.listenTo(this.model, "change:res", this.save);
	},

	events: {
		"click [data-rel=select]": function () {
			this.openFileSelector();
		}
	},

	render: function () {
		var editDiv = this.template("Image-Edit")();
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
};



pageEditor.view("imageEditView", [
	"options", "jstViewExtension", "modelBinderExtension",
	pageEditor.imageEditView
]);