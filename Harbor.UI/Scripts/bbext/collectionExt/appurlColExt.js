/*
 *   
 * Adds an appurl method to a collections which calls appurl.get.
 *
 */
function appurlColExt(mixin, appurl) {
	
	var extension = {
		appurl: appurl.get
	};

	mixin("collection").register("bbext.appurlColExt", extension);

};


bbext.config(["mixin", "appurl", appurlColExt]);