﻿
PageEditor.PagePreviewView = Application.View.extend({
	events: {
		"click #settings-changethumb": function () {
				this.changeThumb();
		}
	},
	
	render: function () {
		this.renderTemplate("PageEditor-PagePreview")(); // jch! - create a bindTemplate method?
		this.bindModelToView();
	},
	
	changeThumb: function () {
		PageLoader.regions.settings.hideEl();
		PageLoader.regions.loader.hideEl();
		FileSelector.start({
			filter: "images",
			region: PageEditor.regions.modal,
			close: function () {
				PageLoader.regions.settings.showEl();
				PageLoader.regions.loader.showEl();
			},
			select: function (selectedFile) {
				this.model.setPreviewImageID(selectedFile.get("id"));
				AjaxRequest.handle(this.model.save());
			}
		}, this);
	}
});


PageEditor.PagePreviewModel = Application.Model.extend({
	defaults: {
		page: null,
		thumbSrc: null,
		thumbClass: null,
		previewText: null,
		autoPreview: null,
		changeThumbButtonText: null,
		changeThumbButtonDisabled: null,
		changeThumbButtonClass: null
	},
	
	initialize: function () {
		this.page = this.get("page");
		this.page.on("sync", this.refresh, this);
		this.on("change:previewText", this.save, this);
		this.on("change:autoPreview", this.save, this);		
	},
	
	thumbClass: {
		get: function (value) {
			return this.hasThumb() ? "max-100" : "display-none";
		}
	},
	
	thumbSrc: {
		get: function (value) {
			var previewImage = this.page.previewImage;
			if (!previewImage) {
				return null;
			}
			return previewImage.get("thumbUrl");
		}		
	},
	
	changeThumbButtonText: {
		get: function (value) {
			return this.hasThumb() ?
				"Change image" : "Select a thumbnail image";
		}
	},
	
	changeThumbButtonClass: {
		get: function () {
			var className = this.get("autoPreview") ? "hide" : "";
			console.log("class", className);
			return className;
		}
	},
	
	previewText: {
		get: function () {
			return this.page && this.page.get("previewText");	
		},
		set: function (value) {
			this.page && this.page.set("previewText", value);
			return value;
		}
	},
	
	autoPreview: {
		get: function () {
			return this.page && this.page.get("autoPreview");				
		},
		set: function (value) {
			this.page && this.page.set("autoPreview", value);
			return value;
		}
	},
	
	hasThumb: function () {
		return this.get("thumbSrc") ? true : false;
	},
	
	setPreviewImageID: function (id) {
		this.page.set("previewImageID", id);
	},
	
	save: function () {
		return this.page.save();
	}
});