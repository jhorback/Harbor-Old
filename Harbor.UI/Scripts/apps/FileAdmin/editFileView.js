

fileAdmin.editFileView = function (options, fileRepo) {

	this.fileRepo = fileRepo;
};

fileAdmin.editFileView.prototype = {
	initialize: function () {

		this.listenTo(this.model, "change", this.saveModel);
		this.model.store();

		_.bindAll(this, "saveModel");
	},

	clickDelete: function () {
		var answer = confirm("Are you sure you want to delete this file?");

		if (!answer) {
			return;
		}

		this.model.destroy();
		this.close();
	},

	done: function () {
		this.close();
	},
	
	saveModel: function (event) {

		if (!this.isModelValid()) {

			this.$("form").addClass("error");
			this.model.restore("name");
			return;

		} else {

			// this.$("form").removeClass("error");			
		}

		this.fileRepo.saveFile(this.model, {
			clientError: function (error) {
				this.displayErrors(error.errors);
			}
		}, this);		
	}
};



fileAdmin.view("editFileView", ["options", "fileRepo", fileAdmin.editFileView]);


fileAdmin.component("editFile", {
	regionEl: "#frame-body"
});
