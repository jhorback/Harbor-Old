
PageSettings.PagePreviewView = Application.View.extend({
    events: {
        "click #settings-changethumb": "changeThumb",
        "click img": "changeThumb",
        "click #settings-removethumb": "removeThumb"
    },

    initialize: function () {
        var page = this.model.get("page");
        this.listenTo(page, "change:previewImage", function (change) {
            this.render();            
        });
    },
	
    render: function () {
		this.renderTemplate("PageSettings-PagePreview")(this.model.toJSON());
	},
	
	changeThumb: function () {
		PageSettings.events.trigger("modal:opened");
		FileSelector.start({
			filter: "images",
			region: PageSettings.regions.modal,
			close: function () {
			    PageSettings.events.trigger("modal:closed");
			},
			select: function (selectedFile) {
			    this.model.setPreviewImageID(selectedFile.get("id"));
			    AjaxRequest.handle(this.model.save());
			}
		}, this);
	},
	
	removeThumb: function () {
	    this.model.setPreviewImageID(null);
	    AjaxRequest.handle(this.model.save());
	}
});


PageSettings.PagePreviewModel = Application.Model.extend({
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
});