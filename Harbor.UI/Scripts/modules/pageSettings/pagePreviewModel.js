

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
			var ret = this.hasThumb() ? "float-left pad-right pad-bottom" : "hide";
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
			return this.hasThumb() ?
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

	removeThumbButtonClass: {
		get: function () {
			return this.hasThumb() ? "" : "hide";
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

	hasThumb: function () {
		return this.get("thumbSrc") ? true : false;
	},

	setPreviewImageID: function (id) {
		this.page.set("previewImageID", id);
	},
	
	removePreviewImage: function () {
		this.page.previewImage = null;

		this.page.set({
			previewImageID: null
		});

		this.set({
			thumbSrc: null,
			thumbClass: "hide"
		});
	},

	save: function () {
		return this.page.save();
	}
};

pageSettings.model("pagePreviewModel", pagePreviewModel);