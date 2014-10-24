
appui.service("documentTitle", ["globalCache", function (globalCache) {

	return {
		setAppName: function (name) {
			globalCache.set("appName", name);
			// this.set(globalCache.get("currentTitle"));
		},

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
