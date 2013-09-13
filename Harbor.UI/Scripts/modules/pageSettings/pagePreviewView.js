

function pagePreviewView(currentPageRepo, fileSelector) {
	this.currentPageRepo = currentPageRepo;
	this.fileSelector = fileSelector;
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
		
		this.fileSelector.render({
			filter: "images",

			// region: PageSettings.regions.modal,

			close: function () {
				// PageSettings.events.trigger("modal:closed");
			},
			
			select: _.bind(function (selectedFile) {

				this.model.setPreviewImageID(selectedFile.get("id"));
				this.currentPageRepo.saveCurrentPage();
			}, this)
		});
	},

	removeThumb: function () {
		if (confirm("Are you sure you want to remove this preview image?")) {
			this.model.removePreviewImage();
			this.currentPageRepo.saveCurrentPage();
		}
	}
};

pageSettings.view("pagePreviewView", ["currentPageRepo", "fileSelector", pagePreviewView]);