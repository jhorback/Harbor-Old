﻿

function pagePreviewView(options, currentPageRepo, fileSelector) {
	this.currentPageRepo = currentPageRepo;
	this.fileSelector = fileSelector;
}

pagePreviewView.prototype = {
	changeThumb: function () {
		
		this.fileSelector.render({
			filter: "images",
			
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

pageSettings.view("pagePreviewView", ["options", "currentPageRepo", "fileSelector", pagePreviewView]);