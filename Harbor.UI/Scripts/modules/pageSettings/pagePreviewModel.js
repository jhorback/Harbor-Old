﻿
function pagePreviewModel(attrs, options, currentPageRepo) {
	this.currentPageRepo = currentPageRepo;
}

pagePreviewModel.prototype = {
	defaults: {
		page: null,
		thumbSrc: null,
		thumbClass: null,
		previewText: null,
		autoPreview: null,
		changeThumbButtonText: null,
		changeThumbButtonDisabled: null,
		changeThumbButtonClass: null,
		hasThumb: false
	},

	initialize: function () {
		this.page = this.get("page");

		this.on("change:previewText", this.save, this);
		this.on("change:autoPreview", this.save, this);
	},

	thumbClass: {
		get: function (value) {
			var ret = this.get("hasThumb") ? "float-left pad-right pad-bottom" : "hide";
			return ret;
		},
		bind: ["thumbSrc"]
	},

	thumbSrc: {
		get: function (value) {
			var previewImage = this.page && this.page.previewImage;
			if (!previewImage) {
				return null;
			}
			return previewImage.get("thumbUrl");
		}
	},

	changeThumbButtonText: {
		get: function (value) {
			return this.get("hasThumb") ?
				"Change image" : "Select a thumbnail image";
		},
		bind: ["thumbSrc"]
	},

	changeThumbButtonClass: {
		get: function () {
			return ""; // always leave this visible for now
			//			var className = this.get("autoPreview") ? "hide" : "";
			//			return className;
		}
	},

	hasThumb: {
		get: function () {
			return this.get("thumbSrc") ? true : false;
		},
		bind: ["thumbSrc"]
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

	setPreviewImage: function (selectedFile) {
		this.page.previewImage = selectedFile;
		this.page.set("previewImageID", selectedFile.get("id"));
		this.set("thumbSrc", selectedFile.get("thumbUrl"));
	},
	
	removePreviewImage: function () {
		this.page.previewImage = null;

		this.page.set({
			previewImageID: null
		});

		this.set({
			thumbSrc: null // ,
			// thumbClass: "hide"
		});
	},

	save: function () {
		if (this.page.hasChanged()) {
			this.currentPageRepo.saveCurrentPage();
		}
	}
};

pageSettings.model("pagePreviewModel", [
	"attrs",
	"options",
	"currentPageRepo",
	pagePreviewModel
]);