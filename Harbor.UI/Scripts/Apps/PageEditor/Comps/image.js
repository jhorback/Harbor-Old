
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


/*
stor imgSrc as field? 
file/id.ext?res=high max=100

// so want to store: fileID, fileExt, max, name - all to build the url

 // want live binding for imgSrc and maxClass
*/

ImageComponent.ImageModel = Application.Model.extend({
	pageProperties: {
		fileID: null,
		ext: null,
		name: null,
		max: 500
	},
	defaults: {
		imgSrc: null,
		maxClass: null
	},
	hasImage: function () {
		return this.get("fileID") ? true : false;
	},
	imgSrc: {
		get: function (value) {
			return Application.url("file/" +
				this.get("fileID") + "/" + this.get("name") + "." +
				this.get("ext") + "?max=" + this.get("max"));
		}
	},
	maxClass: {
		get: function (value) {
			return "max-" + (this.get("max") || 500);
		}
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
			filter: "images",
			region: PageEditor.regions.modal,
			close: function () {
				PageEditor.regions.page.showEl();
			},
			select: function (selectedFile) {
				this.model.set({
					fileID: selectedFile.get("id"),
					ext: selectedFile.get("ext"),
					name: selectedFile.get("name"),
					max: 500
				});
				AjaxRequest.handle(this.model.save()).then(_.bind(this.renderImage, this));
			}
		}, this);
	}
});



PageEditor.registerComponent("image", ImageComponent);