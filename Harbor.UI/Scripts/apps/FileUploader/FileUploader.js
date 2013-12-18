/*
	jch* - do not need this app yet
	thought was to share this between file managmenet and uploading a file from a page
	if not needed when doing the page upload, then remove this app.

	//
	el - container to add uploaded preview images - also acts as a drag container

// older notes:	
-> el will be the container to add the uploaded preview images
-> option for input element for clicking on an upload button
-> if no el for container exists, a dialog will be used?
*/
var FileUploader = new Application({
	start: function (el) {
		el && this.setUploadTarget(el);
	},
	
	setUploadTarget: function (el) {
		this.uploadTarget = el;
		el.css({ height: 100, background: "#ccc" });
		el.html5Uploader({
			name: "foo",
			postUrl: "bar.aspx",
			onClientLoadStart: function (e, file) {
//				var upload = $("#upload");
//				if (upload.is(":hidden")) {
//					upload.show();
//				}
//				upload.append(fileTemplate.replace( /{{id}}/g , slugify(file.name)).replace( /{{filename}}/g , file.name));
			},
			onClientLoad: function (e, file) {
				$("#" + slugify(file.name)).find(".preview").append("<img src=\"" + e.target.result + "\" alt=\"\">");
			},
			onServerLoadStart: function (e, file) {
				$("#" + slugify(file.name)).find(".progressbar").progressbar({ value: 0 });
			},
			onServerProgress: function (e, file) {
				if (e.lengthComputable) {
					var percentComplete = (e.loaded / e.total) * 100;
					$("#" + slugify(file.name)).find(".progressbar").progressbar({ value: percentComplete });
				}
			},
			onServerLoad: function (e, file) {
				$("#" + slugify(file.name)).find(".progressbar").progressbar({ value: 100 });
			}
		});
	},

	browse: function () {
		alert("need this? using file input instead?");
	},
	
	stop: function () {
		
	}
});