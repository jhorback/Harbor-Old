

function pagePreviewView(options, currentPageRepo, fileSelector) {
	this.currentPageRepo = currentPageRepo;
	this.fileSelector = fileSelector;
}

pagePreviewView.prototype = {
	initialize: function () {
	
		this.bindAll("onSelectFile");
	},
	
	changeThumb: function () {
		
		if (this.model.page.get("autoPreviewImage")) {
			return;
		}

		this.model.trigger("pagepreview:openfileselector");

		this.fileSelector.render({
			filter: "images",
			maxFiles: 1,
			select: this.onSelectFile
		});
	},

	onSelectFile: function (selectedFile) {
		this.model.setPreviewImage(selectedFile);
		this.currentPageRepo.saveCurrentPage();
	},

	removeThumb: function () {
		if (confirm("Are you sure you want to remove this preview image?")) {
			this.model.removePreviewImage();
			this.currentPageRepo.saveCurrentPage();
		}
	}
};

pageSettings.view("pagePreviewView", ["options", "currentPageRepo", "fileSelector", pagePreviewView]);