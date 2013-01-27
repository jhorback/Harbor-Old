
// type, $el, uicid, page
var ImageComponent = PageComponent.extend({
	
	create: function () {
		this.open().openFileSelector();
	},
	
	open: function () {
		this.view = new ImageComponent.View({
			el: this.$el,
			model: this.constructModel(ImageComponent.ImageModel)
		});
		
		JSPM.install("FileSelector", function () {
			this.view.render();
		}, this);
		
		return this.view;
	},
	
	close: function () {
		this.view.close();
	}
});



ImageComponent.ImageModel = Application.Model.extend({
	pageProperties: {
		fileID: null,
		max: null
	},
	defaults: {
		fileID: null,
		imgSrc: null,
		max: null,
		maxClass: null
	},
	imgSrc: {
		get: function () {
			var fileID = this.get("fileID");
			return Application.url("file/" + fileID + ".jpg?max=" + 500);
		}
	},
	hasImage: function () {
		return this.get("fileID") ? true : false;
	}
});


ImageComponent.View = Application.View.extend({
	initialize: function () {
	},
	
	events: {
		"click [data-rel=image]": function () {
			this.openFileSelector();
		}
	},
	
	render: function () {
		
	},
	
	renderImage: function () {
		if (this.model.hasImage() === false) {
			return;
		}
		this.renderTemplate("Comps-Image")(this.model.toJSON());
	},
	
	openFileSelector: function () {
		PageEditor.regions.page.hideEl();
		FileSelector.start({
			region: PageEditor.regions.modal,
			close: function () {
				PageEditor.regions.page.showEl();
			},
			select: function (selectedFile) {
				this.model.set("fileID", selectedFile.get("id"));
				AjaxRequest.handle(this.model.save()).then(_.bind(this.renderImage, this));
			}
		}, this);
	}
});



PageEditor.registerComponent("image", ImageComponent);