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
         * @param {string} url - the URL to set as the new base URL
         */
		setBaseUrl: function (url) {
			baseUrl = url;
			globalCache.set("baseUrl", baseUrl);
		},

        /**
         * returns the base URL for the application. If a relative url is provided it will be joined
         * with the base URL before returning.
         * @param {string=} [url] - an optional URL to concatenate onto the base URL
         * @returns string
         */
		get: function (url) {
            return (url && url.charAt(0) === '/') ? url : (baseUrl || "") + (url || "");
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

/**
 * @memberof appui
 * @constructor
 * @class appuiDialog
 */
appui.register("appuiDialog", function () {
    /** @type Dialog */
	return Dialog;
});

/**
 * @memberof appui
 * @constructor
 * @class dialogFactory
 */
appui.service("dialogFactory", ["context", "appuiDialog", function (context, appuiDialog) {
    /** @name appui.dialogFactory */
	return {
		create: function (el, options) {
			return new appuiDialog(el, options);
		}
	};
}]);
