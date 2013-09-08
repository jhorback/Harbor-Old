

var pagePreviewModel = {
	defaults: {
		page: null,
		thumbSrc: null,
		thumbClass: null,
		previewText: null,
		autoPreview: null,
		changeThumbButtonText: null,
		changeThumbButtonDisabled: null,
		changeThumbButtonClass: null,
		removeThumbButtonClass: null
	},

	initialize: function () {
		this.page = this.get("page");

		this.on("change:previewText", this.save, this);
		this.on("change:autoPreview", this.save, this);
	},

	thumbClass: {
		get: function (value) {
			return this.hasThumb() ? "float-left pad-right pad-bottom" : "hide";
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
			return ""; // always leave this visible for now
			//			var className = this.get("autoPreview") ? "hide" : "";
			//			return className;
		}
	},

	removeThumbButtonClass: {
		get: function () {
			return this.hasThumb() ? "" : "hide";
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
};

pageSettings.model("pagePreviewModel", pagePreviewModel);