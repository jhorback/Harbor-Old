 /*
  * routerInfo service
  *     Provides urls and route execution for routers that use the managed router extension.
  * 
  *  url(name, args)
  *     Provides a fully qualified url of a specified route.
  *     Can be used as the href of links.
  *         *name - Either the route name or pattern used when defining the route
  *          *args - An array of args to pass to the url function of the managed router route.
  *     Returns null if the route name or pattern is not defined.
  *
  * executeRoute(name, args)
  *     Executes the route with the given name/pattern.
  *         *name - Either the route name or pattern when defining the route.
  *         *args - An array of args to pass to the url function of managed router route.
  *
  *
  * The following methods are called by the managed router extension and should not 
  *     be needed to call directly.
  *
  * routeUrl(name, args)
  *     Same as url, however, for use by router.navigate. It excludes the root since the router knows it.
  *         *name - Either the route name or pattern when defining the route.
  *         *args - An array of args to pass to the url function of managed router route.
  * 
  * setUrl(name, path, router)
  *     Used by a managed router to register a url with the routerInfo.
  *     This method will log an error if overriding an existing router url.
  *         *name - A key to refer to the url by. Each route should be registered using
  *                 both the url pattern and the route name if different than the pattern.
  *         *path - Path can be the route pattern or function to call to get the route pattern.
  *                 If a function, its signature should match any dynamic route parameters.
  *         *router - The router that is in charge of the specific route.
  *
  * root()
  *     Returns the root set by calling setRoot.
  *
  * setRoot(path)
  *     Called by a managed router to set the root url of the page.
  *     Uses the appurl service to determine the app root.
  *         *path - The root path.
  */
bbext.routerInfo = function (appurl, console, _) {

	var root = appurl.get(""),
	    rootSet = false,
	    urls = {};

	return {
		url: function (name, args) {
			var path = this.routeUrl.call(this, name, args);
			return (root || "") + (path || "");
		},

		executeRoute: function (name, args) {
			var url = urls[name];
			url.router.executeRoute(name, args);
		},

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
