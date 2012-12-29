FileAdmin.MainView = Application.View.extend({
	
	uploadTargetView: null,

	initialize: function () {

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
		var el = this.$el.find("li").eq(info.index);
		setTimeout(function () {
			el.fadeOut("slow", function () {
				el.remove();
			});
		}, 0);
	}
});