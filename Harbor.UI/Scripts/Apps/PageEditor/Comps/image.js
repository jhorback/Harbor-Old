
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
	},
	
	close: function () {
		console.log("close image");
	},
	
	destroy: function () {
		console.log("destroy image");		
	},
	
	openFileSelector: function () {
		PageEditor.regions.page.hideEl();
		// jch! - create the FileSelector next
		FileSelector.open({
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