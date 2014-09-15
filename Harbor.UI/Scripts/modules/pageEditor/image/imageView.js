

pageEditor.imageView = function (options, fileSelector) {

	this.fileSelector = fileSelector; 
	
};


pageEditor.imageView.prototype = {
	
	initialize: function () {
		_.bindAll(this, "close", "save", "selectFile");

		this.listenTo(this.model, "change:res", this.save);		
	},

	save: function () {
		this.options.saveCurrentPage();
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
			name: file.get("name"),
			fileExists: true
			// dont include max since we are saving on max change too
		});
		this.model.page.updatePagePreviewImage(this.options.uicid, fileID);
		this.save();
	},

	onClose: function () {
		this.$("[data-rel=edit]").remove();
	}
};



pageEditor.view("imageView", [
	"options", "fileSelector",
	pageEditor.imageView
]);