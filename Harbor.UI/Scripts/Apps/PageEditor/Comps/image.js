
// type, $el, uicid, page
var ImageComponent = ContentComponent.extend({
	create: function () {
		this.open().openFileSelector();
	},
	
	open: function () {
		this.view = new ImageComponent.View({
			el: this.$el,
			model: this.page,
			uicid: this.uicid
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
		// jch! image.js - pull in the FileModel to get the url
		// think about how to allow the user to change the image size.
		var prop = this.model.getProperty(this.options.uicid + "-fileID"), // jch! - helper method for this
		    model;
		
		if (!prop) {
			return;
		}
		model = {
			url: Application.url("file/" + prop.value + ".jpg?max=" + 500),
			maxClass: "jch!DOTHIS"
		};
		this.renderTemplate("Comps-Image")(model);
	},
	
	openFileSelector: function () {
		PageEditor.regions.page.hideEl();
		FileSelector.start({
			region: PageEditor.regions.modal,
			close: function () {
				PageEditor.regions.page.showEl();
			},
			select: function (selectedFile) {
				this.model.setProperty(this.options.uicid + "-fileID", selectedFile.get("id")); // jch! - helper method on component for this!
				AjaxRequest.handle(this.model.save()).then(_.bind(this.renderImage, this));
			}
		}, this);
	}
});



PageEditor.registerComponent("image", ImageComponent);