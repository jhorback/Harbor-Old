

function pagePreviewView() {

}

pagePreviewView.prototype = {
	initialize: function () {
		//var page = this.model.get("page");
		//this.listenTo(page, "change:previewImage", function (change) {
		//	this.render();
		//});
	},
	
	changeThumb: function () {
		alert("change thumb");
		/*
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
		*/
	},

	removeThumb: function () {
		this.model.setPreviewImageID(null);
		AjaxRequest.handle(this.model.save());
	}
};

pageSettings.view("pagePreviewView", [pagePreviewView]);