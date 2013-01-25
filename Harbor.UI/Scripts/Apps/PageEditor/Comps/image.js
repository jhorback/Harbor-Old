
// type, $el, uicid, page
var ImageComponent = ContentComponent.extend({
	create: function () {
		console.log("create image");
		// this will immediately open the FileSelector 
		
		// 
	},
	
	open: function () {
		console.log("open image");
		// create a view - has an change image button
		// which listens for click to open the FileSelector
		this.view = new ImageComponent.View({
			el: this.$el,
			model: this.page
		});
		JSPM.install("FileSelector").then(_.bind(function () {
			this.view.render();
		}, this));
	},
	
	close: function () {
		this.view.close();
	}
});


ImageComponent.View = Application.View.extend({
	initialize: function () {
		
	},
	
	events: {
		"click div": function () {
			this.openFileSelector();
		}
	},
	
	openFileSelector: function () {
		PageEditor.regions.page.hideEl();
		// jch! - here - need to fill out the file selector
		FileSelector.start({
			region: PageEditor.regions.modal,
			close: function () {
				PageEditor.regions.page.showEl();
			},
			select: function (selectedPage) {
				// change the image - page.setProperty("uicid-fileID", fileID);
				// AjaxRequest.handle(this.page.save());
			}
		}, this);
	}
});



PageEditor.registerComponent("image", ImageComponent);