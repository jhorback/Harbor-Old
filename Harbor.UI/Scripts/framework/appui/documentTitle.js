appui.service("documentTitle", ["globalCache", function (globalCache) {

    /** @name appui.documentTitle */
	return {

        /**
         * Sets the provided app name in the global cache
         * @name appui.documentTitle#setAppName
         * @param {string} name
         */
		setAppName: function (name) {
			globalCache.set("appName", name);
		},

        /**
         * Displays the app name (if set) and provided title as the window title
         * @name appui.documentTitle#set
         * @param {string} title
         */
		set: function (title) {
			var appName = globalCache.get("appName") || "",
			    titleParts = [];
			globalCache.set("currentTitle", title);

			title && titleParts.push(title);
			appName && titleParts.push(appName);
			window.document.title = titleParts.join(" - ");
		}
	}
}]);
