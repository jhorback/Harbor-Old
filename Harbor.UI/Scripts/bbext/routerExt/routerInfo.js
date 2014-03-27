
 
bbext.routerInfo = function (appurl, console, _) {

	var root = appurl.get(""),
	    rootSet = false,
	    urls = {};

	return {
		// returns null if not defined
		// name can be the route name or pattern
		url: function (name, args) {
			var path = this.routeUrl.call(this, name, args);
			return (root || "") + (path || "");
		},

		// use by router navigate - exluces the root since the router knows the root
		routeUrl: function (name, args) {
			var url = urls[name],
			    path;

			if (!url) {
				return null;
			}

			path = _.isFunction(url.path) ?
				url.path.apply(url.router, args) :
				url.path;

			return path;
		},
		
		root: function () {
			return root;
		},

		// called by the managed router extension
		// name can be the route name or pattern
		setUrl: function (name, path, router) {
			var current = urls[name];
			if (current && current.path !== path && current.router !== router) {
				console.error("Overriding a router url; path: " + path);
			}
			urls[name] = {
				path: path,
				router: router
			};
		},
		
		// called by the managed router extension
		setRoot: function (path) {
			var newRoot = appurl.get(path);
			if (rootSet && newRoot !== root) {
				console.error("Changing page root from '" + root + "' to '" + newRoot + "'");
			}
			root = newRoot;
			rootSet = true;
			return root;
		}
	};
};


bbext.service("routerInfo", [
	"appurl",
	"console",
	"_",
	bbext.routerInfo	
]);
