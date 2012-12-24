var FileModel = Application.Model.extend({
	urlRoot: Session.url("api/files"),
	defaults: {
		id: null,
		userName: null,
		album: null,
		name: null,
		contentType: null,
		ext: null,
		description: null,
		public: null,
		uploaded: null,
		modified: null,
		size: null,
		isBitmap: false,
		thumbUrl: null,
		totalSize: null,
		url: null,
		lowResUrl: null,
		highResUrl: null,
		//
		editLink: null
	},
	
	url: {
		get: function (value) {
			return value && Application.url(value);
		}
	},
	
	lowResUrl: {
		get: function (value) {
			return value && Application.url(value);
		}
	},
	
	highResUrl: {
		get: function (value) {
			return value && Application.url(value);
		}
	},
	
	thumbUrl: {
		get: function (value) {
			return value && Application.url(value);
		}
	},
	
	editLink: {
		get: function () {
			return Application.url("user/files/edit/") + this.get("id");
		}
	}
});