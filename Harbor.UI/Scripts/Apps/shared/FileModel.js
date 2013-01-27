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
		href: null,
		lowResUrl: null,
		highResUrl: null,
		//
		editLink: null
	},
	
//	href: {
//		get: function (value) {
//			return value && Application.url(value);
//		},
//		set: function (value) {
//			return value;
//		}
//	},
//	
//	lowResUrl: {
//		get: function (value) {
//			return value && Application.url(value);
//		}
//	},
//	
//	highResUrl: {
//		get: function (value) {
//			return value && Application.url(value);
//		}
//	},
//	
//	thumbUrl: {
//		get: function (value) {
//			return value && Application.url(value);
//		}
//	},
	
	editLink: {
		get: function () {
			return Application.url("user/files/edit/") + this.get("id");
		}
	}
});


FileModel.Files = Backbone.Collection.extend({
	model: FileModel,
	url: Session.url("api/files"),
	search : function (title) {
		var pattern;
		
		if (title === "") {
			return this;
		}
		
		pattern = new RegExp(title, "gi");
		return _(this.filter(function (data) {
		  	return pattern.test(data.get("name"));
		}));
	}
});