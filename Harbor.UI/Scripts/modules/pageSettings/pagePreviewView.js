

function pagePreviewView() {

}

pagePreviewView.prototype = {

};

pageSettings.model("pagePreviewView", [pagePreviewView]);


/*
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


*/