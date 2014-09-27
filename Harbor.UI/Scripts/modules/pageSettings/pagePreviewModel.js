
function pagePreviewModel(attrs, options, currentPageRepo) {
	this.currentPageRepo = currentPageRepo;
}

pagePreviewModel.prototype = {
	defaults: {
		page: null,
		thumbSrc: null,
		thumbClass: null,
		previewText: "",
		autoPreviewText: true,
		autoPreviewImage: true,
		changeThumbButtonText: null,
		changeThumbButtonDisabled: null,
		hasThumb: false,
		canEditText: false,
		canEditImage: false
	},

	initialize: function () {
		this.page = this.get("page");

		this.on("change:previewText", this.save, this);
		this.on("change:autoPreviewText", this.save, this);
		this.on("change:autoPreviewImage", this.save, this);
		this.listenTo(this.page, "change:previewImageID", this.refreshFn("thumbSrc"));
		this.listenTo(this.page, "change:previewText", this.refreshFn("previewText"));
	},

	"[thumbClass]": {
		get: function (value) {
			var ret = this.get("hasThumb") ? "float-left pad-right pad-bottom" : "hide";
			return ret;
		},
		bind: ["thumbSrc"]
	},

	"[thumbSrc]": {
		get: function (value) {
			var previewImage = this.page && this.page.previewImage;
			if (!previewImage) {
				return null;
			}
			return previewImage.get("thumbUrl");
		}
	},

	"[changeThumbButtonText]": {
		get: function (value) {
			return this.get("hasThumb") ?
				"Change image" : "Select an image";
		},
		bind: ["thumbSrc"]
	},

	"[hasThumb]": {
		get: function () {
			return this.get("thumbSrc") ? true : false;
		},
		bind: ["thumbSrc"]
	},

	"[previewText]": {
		get: function () {
			return this.page && this.page.get("previewText");
		},
		set: function (value) {
			this.page && this.page.set("previewText", value);
			return value;
		}
	},

	"[autoPreviewText]": {
		get: function () {
			return this.page && this.page.get("autoPreviewText");
		},
		set: function (value) {
			this.page && this.page.set("autoPreviewText", value);
			return value;
		}
	},

	"[autoPreviewImage]": {
		get: function () {
			return this.page && this.page.get("autoPreviewImage");
		},
		set: function (value) {
			this.page && this.page.set("autoPreviewImage", value);
			return value;
		}
	},

	"[canEditText]": {
		get: function (value) {
			return !this.attributes.autoPreviewText;
		},
		observe: ["autoPreviewText"]
	},

	"[canEditImage]": {
		get: function (value) {
			return !this.attributes.autoPreviewImage;
		},
		observe: ["autoPreviewImage"]
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

	save: function (model) {
		//debugger;
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