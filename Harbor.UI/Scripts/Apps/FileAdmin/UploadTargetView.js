FileAdmin.UploadTargetView = Application.View.extend({
	render: function () {
		this.setupDropTarget();
	},
	
	setupDropTarget: function () {
		var el = this.$el,
			slugify = function (file) {
				return FileAdmin.slugify(file.name + file.lastModifiedDate.getTime());
			},
		    fileTemplate = "<div id=\"{{id}}\" class=\"float-left pad\">" + 
			    "<div class=\"progressbar\"></div>" +
				"<div class=\"preview\"></div>" +
				"<div class=\"filename\">{{filename}}</div>" +
				"</div>";
		
		el.css({ minHeight: 100, background: "#ccc" });
		el.html5Uploader({
			name: "uploadedFile",
			postUrl: "../upload",
			onClientLoadStart: function (e, file) {
				FileAdmin.events.trigger("uploadStarted");
				// started on the client
				var upload = el;
				if (upload.is(":hidden")) {
					upload.show();
				}
				upload.append(fileTemplate.replace( /{{id}}/g , slugify(file)).replace( /{{filename}}/g , file.name));
			},
			onClientLoad: function (e, file) {
				
				var src = e.target.result;
				var ext = file.name.substring(file.name.lastIndexOf("."), file.name.length);
				if (_.contains([".bmp", ".gif", ".exif", ".jpg", ".png", ".tiff"], ext.toLowerCase()) === false) {
					src = Application.url("user/thumbnail?name=" + file.name);
				}

				$("#" + slugify(file)).find(".preview").append("<img style=\"max-width:100px;\" src=\"" + src + "\" alt=\"\">");
			},
			onServerLoadStart: function (e, file) {
				$("#" + slugify(file)).find(".progressbar").html("0% progress");
			},
			onServerProgress: function (e, file) {
				if (e.lengthComputable) {
					var percentComplete = (e.loaded / e.total) * 100;
					$("#" + slugify(file)).find(".progressbar").html(percentComplete + "% progress");
				}
			},
			onClientAbort: function () {
				FileAdmin.events.trigger("uploadFinished");				
			},
			onServerAbort: function () {
				FileAdmin.events.trigger("uploadFinished");
			},
			onServerLoad: function (e, file) {
				FileAdmin.events.trigger("uploadFinished");
				$("#" + slugify(file)).find(".progressbar").html("");
			}
		});
	}
});