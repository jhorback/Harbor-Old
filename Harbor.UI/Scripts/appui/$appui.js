
/** @namespace appui */
var appui = context.module("appui").use("Underscore", "jQuery");


appui.service("appurl", ["globalCache", function (globalCache) {
	var baseUrl = globalCache.get("baseUrl") || "";

    /**
     * A utility object for working with an environment's base URL
     * @name appui.appurl
     */
 	return {
        /**
         * sets the base URL for the application
         * @memberof appui.appurl
         * @param {string} url - the URL to set as the new base URL
         */
		setBaseUrl: function (url) {
			baseUrl = url;
			globalCache.set("baseUrl", baseUrl);
		},

        /**
         * returns the base URL for the application. If a url provided it will be joined
         * with the base URL before returning.
         * @memberof appui.appurl
         * @param {string=} [url] - an optional URL to concatenate onto the base URL
         * @returns string
         */
		get: function (url) {
			return (baseUrl || "") + (url || "");
		}

	};
}]);


appui.register("appuiMenu", function () {
	return Menu;
});


appui.service("menuFactory", ["context", "appuiMenu", function (context, appuiMenu) {
	return {
		create: function (el, options) {
			return new appuiMenu(el, options);
		}
	};
}]);


appui.register("appuiDialog", function () {
	return Dialog;
});


appui.service("dialogFactory", ["context", "appuiDialog", function (context, appuiDialog) {
	return {
		create: function (el, options) {
			return new appuiDialog(el, options);
		}
	};
}]);
