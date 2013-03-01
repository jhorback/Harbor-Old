FileAdmin.MainView = Application.View.extend({
	
	uploadTargetView: null,

	initialize: function () {
		console.log("INITIALIXING MAIN VIEW");
		this.uploadingCount = 0;
		this.model = new FileAdmin.MainViewModel();
		this.listenTo(this.model, "change:state", this.stateChange);
		
		this.listenTo(this.collection, "add", this.addFile);
		this.listenTo(this.collection, "destroy", this.removeFile);
		this.listenTo(this.collection, "reset", this.render);

		this.listenTo(FileAdmin.events, "uploadStarted", this.uploadStarted);
		this.listenTo(FileAdmin.events, "uploadFinished", this.uploadFinished);
	},

	events: {
		"click [name=uploadFiles]": function () {
			this.model.toggleUploadState();
		},
		
		"click .col": function (event) {
			var col = $(event.target).closest(".col");
			var link = col.find("[href]");
			link.click();
		}
	},
	
	stateChange: function () {
		var state = this.model.get("state");
		if (state === "ready") {
			this.uploadTargetView.$el.fadeIn();
		} else if (state === "default") {
			this.uploadTargetView.$el.fadeOut();
			FileAdmin.files.fetch();
		}
	},
	
	uploadStarted: function () {
		this.uploadingCount++;
		this.model.set("state", "uploading");
	},
	
	uploadFinished: function () {
		this.uploadingCount--;
		this.model.set("state", "ready");		
	},

	render: function () {
		console.log("RENDERING MAIN VIEW");
		this.template("FileAdmin-Main", this.$el)();
		
		var albumsView =  new FileAdmin.AlbumsView({
			collection: this.collection
		});
		this.$("#fileadmin-filelist").html(albumsView.render().el);
		
		this.bindModelToView(this.model, this.$(".page-header"));

		this.renderUploadTarget();
		return this;
	},
	
	renderUploadTarget: function () {
		var uploadTarget = $("#" + FileAdmin.uploadTargetId);
		if (uploadTarget.length === 0) {
			uploadTarget = $('<div/>').attr("id", FileAdmin.uploadTargetId);
			uploadTarget.prependTo(this.$("#fileadmin-filelist"));
		}

		this.uploadTargetView = new FileAdmin.UploadTargetView({ el: uploadTarget });
		this.uploadTargetView.render();
		this.uploadTargetView.$el.hide();
	},
	
	addFile: function (file) {
		FileAdmin.trigger("fileAdded", file);
	},
	
	removeFile: function (file, collection, info) {
		if (file.removed === true) {
			console.warn("FILE REMOVED ALREADY - RETURNING");
			return;
		}
		file.removed = true;
		
		console.log("QUEUED FOR REMOVE");
		var el = this.$el.find("#" + file.get("id"));
		setTimeout(function () {
			el.fadeOut("slow", function () {
				el.remove();
			});
		}, 0);
	}
});