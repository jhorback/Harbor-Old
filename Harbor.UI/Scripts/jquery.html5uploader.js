/*
Works with both drop area and upload input type

FROM THE DOCUMENTATION:
http://www.igloolab.com/jquery-html5-uploader
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.html5uploader.min.js"></script>
<script type="text/javascript">
$(function() {
	$("#dropbox, #multiple").html5Uploader({
		name: "foo",
		postUrl: "bar.aspx"	
	});
});
</script>
<div id="dropbox"></div>
<input id="multiple" type="file" multiple>



Example JavaScript:
$(function(){
	var fileTemplate="<div id=\"{{id}}\">";
	fileTemplate+="<div class=\"progressbar\"></div>";
	fileTemplate+="<div class=\"preview\"></div>";
	fileTemplate+="<div class=\"filename\">{{filename}}</div>";
	fileTemplate+="</div>";
	
	function slugify(text){text=text.replace(/[^-a-zA-Z0-9,&\s]+/ig,'');
		text=text.replace(/-/gi,"_");
		text=text.replace(/\s/gi,"-");
		return text;
	}

	$("#dropbox").html5Uploader({
		onClientLoadStart: function(e,file){
			var upload=$("#upload");
			if(upload.is(":hidden")) { 
				upload.show();
			}
			upload.append(fileTemplate.replace(/{{id}}/g,slugify(file.name)).replace(/{{filename}}/g,file.name));
		},
		onClientLoad:function(e,file){
			$("#"+slugify(file.name)).find(".preview").append("<img src=\""+e.target.result+"\" alt=\"\">");
		}
		onServerLoadStart:function(e,file){
			$("#"+slugify(file.name)).find(".progressbar").progressbar({value:0});
		},
		onServerProgress:function(e,file){
			if(e.lengthComputable){
				var percentComplete=(e.loaded/e.total)*100;
				$("#"+slugify(file.name)).find(".progressbar").progressbar({value:percentComplete});}
			},
		onServerLoad:function(e,file){
			$("#"+slugify(file.name)).find(".progressbar").progressbar({value:100});
		}});
		
		$(".download").mousedown(function(){
			$(this).css({"background-image":"url('images/download-clicked.png')"});
		}).mouseup(function(){
			$(this).css({"background-image":"url('images/download.png')"});
		});
});


Example markup:
	<section id="demo">
        <header>
            <h3>Demo</h3>
        </header>
        <p>
            Please drag &amp; drop your pictures on the image below.   
        </p>
        <div id="dropbox"></div>
        <div id="upload"></div>
    </section>

	Options:
	name: upload field identifier.
	postUrl: the url to post the file data.
	onClientAbort: Called when the read operation is aborted.
	onClientError: Called when an error occurs.
	onClientLoad: Called when the read operation is successfully completed.
	onClientLoadEnd: Called when the read is completed, whether successful or not. This is called after either onload or onerror.
	onClientLoadStart: Called when reading the data is about to begin.
	onClientProgress: Called periodically while the data is being read.
	onServerAbort: Called when the post operation is aborted.
	onServerError: Called when an error occurs.
	onServerLoad: Called when the post operation is successfully completed.
	onServerLoadStart: Called when posting the data is about to begin.
	onServerProgress: Called periodically while the data is being posted.
	onServerReadyStateChange: A JavaScript function object that is called whenever the readyState attribute changes. The callback is called from the user interface thread.
	onSuccess: Called when the post operation is successfully completed, the ReadyState is 4 and the HttpStatus is 200. Useful to get back informations from the server.
*/
(function ($) {

    $.fn.html5Uploader = function (options) {

        var crlf = '\r\n';
        var boundary = "boundary";
        var dashes = "--";

        var settings = {
            "name": "uploadedFile",
            "postUrl": "Upload.aspx",
            "onClientAbort": null,
            "onClientError": null,
            "onClientLoad": null,
            "onClientLoadEnd": null,
            "onClientLoadStart": null,
            "onClientProgress": null,
            "onServerAbort": null,
            "onServerError": null,
            "onServerLoad": null,
            "onServerLoadStart": null,
            "onServerProgress": null,
            "onServerReadyStateChange": null,
            "onSuccess": null
        };

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function (options) {
            var $this = $(this);
            if ($this.is("[type=\"file\"]")) {
                $this.bind("change", function () {
                    var files = this.files;
                    for (var i = 0; i < files.length; i++) {
                        fileHandler(files[i]);
                    }
                });
            } else {
                $this.bind("dragenter dragover", function () {
                    return false;
                }).bind("drop", function (e) {
                    var files = e.originalEvent.dataTransfer.files;
                    for (var i = 0; i < files.length; i++) {
                        fileHandler(files[i]);
                    }
                    return false;
                });
            }
        });

        function fileHandler(file) {
            var fileReader = new FileReader();
            fileReader.onabort = function (e) {
                if (settings.onClientAbort) {
                    settings.onClientAbort(e, file);
                }
            };
            fileReader.onerror = function (e) {
                if (settings.onClientError) {
                    settings.onClientError(e, file);
                }
            };
            fileReader.onload = function (e) {
                if (settings.onClientLoad) {
                    settings.onClientLoad(e, file);
                }
            };
            fileReader.onloadend = function (e) {
                if (settings.onClientLoadEnd) {
                    settings.onClientLoadEnd(e, file);
                }
            };
            fileReader.onloadstart = function (e) {
                if (settings.onClientLoadStart) {
                    settings.onClientLoadStart(e, file);
                }
            };
            fileReader.onprogress = function (e) {
                if (settings.onClientProgress) {
                    settings.onClientProgress(e, file);
                }
            };
            fileReader.readAsDataURL(file);

            var xmlHttpRequest = new XMLHttpRequest();
            xmlHttpRequest.upload.onabort = function (e) {
                if (settings.onServerAbort) {
                    settings.onServerAbort(e, file);
                }
            };
            xmlHttpRequest.upload.onerror = function (e) {
                if (settings.onServerError) {
                    settings.onServerError(e, file);
                }
            };
            xmlHttpRequest.upload.onload = function (e) {
                if (settings.onServerLoad) {
                    settings.onServerLoad(e, file);
                }
            };
            xmlHttpRequest.upload.onloadstart = function (e) {
                if (settings.onServerLoadStart) {
                    settings.onServerLoadStart(e, file);
                }
            };
            xmlHttpRequest.upload.onprogress = function (e) {
                if (settings.onServerProgress) {
                    settings.onServerProgress(e, file);
                }
            };
            xmlHttpRequest.onreadystatechange = function (e) {
                if (settings.onServerReadyStateChange) {
                    settings.onServerReadyStateChange(e, file, xmlHttpRequest.readyState);
                }
                if (settings.onSuccess && xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
                    settings.onSuccess(e, file, xmlHttpRequest.responseText);
                }
            };
            xmlHttpRequest.open("POST", settings.postUrl, true);

            if (file.getAsBinary) { // Firefox

                var data = dashes + boundary + crlf +
                    "Content-Disposition: form-data;" +
                    "name=\"" + settings.name + "\";" +
                    "filename=\"" + unescape(encodeURIComponent(file.name)) + "\"" + crlf +
                    "Content-Type: application/octet-stream" + crlf + crlf +
                    file.getAsBinary() + crlf +
                    dashes + boundary + dashes;

                xmlHttpRequest.setRequestHeader("Content-Type", "multipart/form-data;boundary=" + boundary);
                xmlHttpRequest.sendAsBinary(data);

            } else if (window.FormData) { // Chrome

                var formData = new FormData();
                formData.append(settings.name, file);

                xmlHttpRequest.send(formData);

            }
        }

    };

})(jQuery);