

pageEditor.imageEditView = function (options, currentPageRepo, fileSelector) {

	this.currentPageRepo = currentPageRepo;
	this.fileSelector = fileSelector;
	
};


pageEditor.imageEditView.prototype = {
	
	initialize: function () {
		_.bindAll(this, "close", "save", "selectFile");

		this.listenTo(this.model, "change:res", this.save);		
	},

	save: function () {
		this.currentPageRepo.saveCurrentPage();
	},

	openFileSelector: function () {
		
		this.fileSelector.render({
			filter: "images",
			xclose: this.close,
			select: this.selectFile
		});
	},
	
	selectFile: function (file) {
		var fileID = file.get("id");
		this.model.set({
			fileID: fileID,
			ext: file.get("ext"),
			name: file.get("name")
			// dont include max since we are saving on max change too
		});
		this.model.page.updatePagePreviewImage(this.options.uicid, fileID);
		this.save();
	},

	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};



pageEditor.view("imageEditView", [
	"options", "currentPageRepo", "fileSelector",
	pageEditor.imageEditView
]);