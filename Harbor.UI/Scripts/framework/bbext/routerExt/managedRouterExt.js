/*
 * managedRouterExt router mixin
 *
 * Defining managed routes
 *     The routes object on the router can be modified to include additional information about each route.
 *         *name - A name to be used to reference the route. Defaults to the route key.
 *         *url - A url to be used when navigating or retriving for links.
 *                This can be a method which takes arguments defined by the route pattern.
 *                This defaults to the route pattern.
 *         *callback - A function (or name of a function on the router) to call when the route executes.
 *                     This callback should have the same method signature as the url option.
 *                     This defaults to the name option.
 *       Because of the defaults in the options above, it is possible to define a route with an empty object.
 *           "viewUsers": {} - would have a name of "viewUsers", url of "viewUsers", and callback function "viewUsers"
 *
 *
 * setRoot(root)
 *     Sets the root using the routerInfo service. This accounts for the appurl.
 *         *root - The root to be used by Backbone.History
 *
 * showComponent(name, options)
 *     Creates and manages the component with the specified name.
 *     Options can be any option to be passed to the components root view.
 *     Additional options can be:
 *         *region - A node or selector for the location on the page to render the component in.
 *         *cache - A boolean flag to indicate if the component should be cached.
 *                  The default value is determined dynamically by the arguments
 *                  passed to the surrounding route method.
 *
 * Example
 *     function someRouter(userRepo) {
 *         this.userRepo = userRepo;
 *     }
 *     someRoute.prototype = {
 *         routes: {
 *             "users": {},
 *             "users/:id": {
 *                 name: "viewUser",
 *                 url: function (id) {
 *                     return "users/" + id;
 *                 },
 *                 callback: "viewUser
 *             },
 *             "*default": {
 *                 url: "",
 *                 callback: "users"
 *             }
 *         },
 *         users: function () {
 *             this.showComponent("usersListComponent", {
 *                 region: "#frame-body"
 *             });
 *         },
 *         viewUser: function(id) {
 *             var user = this.userRepo.getUser(id);
 *             this.showComponent("userComponent", {
 *                 region: "#frame-body",
 *                 model: user
 *             });
 *         }
 *     };
 *
 * NOTE
 *     Only supports routes defined by the routes object on the router.
 *     Does not currently support the router.route method (would have to curry that method if desired).
 *     router.route(route, {[name, cache, url], callback});
 */
bbext.managedRouterExt = function (routerInfo, context) {
	var routerMixin, managedRouterExt;

    /** @typedef {{
     *  previousRoute: null,
     *  currentRoute: null,
     *  currentRouteArgs: Array,
     *  names: {},
     *  components: {},
     *  routes: {}
     *  }} RouteCache
     */

    /** @typedef {{
     *  name: string,
     *  url: string,
     *  callback: function
     *  component: string
     *  cache: boolean
     *  previousArgs: Array
     *  }} RouteObject
     */

    /**
     * @mixin
     * @extends Backbone.Router.prototype
     */
	managedRouterExt = {

		ctor: {
			before: function (options) {

				/** @type RouteCache */
				this.routeCache = {
					previousRoute: null,
					currentRoute: null,
					currentRouteArgs: [],
					names: {}, // values point to keys in routes
					components: {}, // holds the components by name
					/** @type {Object.<string, RouteObject>} */
					routes: {/*
						"pattern": {
							name:, url:, callback:,
							component: <name of the component to cache>,
							cache: <bool>,
							previousArgs: [],
							replaceHistory: false
						}
					*/}
				};

				// adapted from Backbone router constructor and _bindRoutes
				// basically runs through the routes object and records the metadata
				options || (options = {});
				if (options.routes) {
					this.routes = options.routes;
				}
				if (!this.routes) {
					return;
				}

				this.routes = _.result(this, 'routes');
				_.each(this.routes, function (callback, pattern) {
					if (_.isFunction(callback) === false && _.isObject(callback) === true) {
						addRouteMetaData.call(this, pattern, callback);
					}
				}, this);
			}
		},

        /**
         * Sets the router's root url - current appurl is automatically prepended
         * @param {string} root - the router's root url relative to app root
         * @this Backbone.Router.prototype
         */
		setRoot: function (root) {
			// this is passed to Backbone.History in the startRouterExt
			this.root = routerInfo.setRoot(root);
		},

        /**
         * Renders the specified component using the provided options, if any, navigates to
         * its URL (which may not be different than the current URL), then returns the component
         * @param {string} name - a component name registered on the context
         * @param {{
         *   cache:boolean,
         *   region: jquery|string
         * }=} [options] - Any options to send to the component render method. Can also contain
         *   cache (boolean) and region properties, where region is a node or jquery selector in which
         *   the component will be inserted
         * @returns {bbext.component}
         */
		showComponent: function (name, options) {
		    var routeCache = this.routeCache,
		        previousRouteInfo = routeCache.routes[routeCache.previousRoute],
		        currentRouteInfo = routeCache.routes[routeCache.currentRoute],
		        component = routeCache.components[name],
		        argsMatch = routeArgsMatch(routeCache),
		        navigateOptions,
		        url;


		    // if we are switching routes or we are not caching
		    var sameRoute = routeCache.previousRoute === routeCache.currentRoute && argsMatch;
		    if (!sameRoute || !currentRouteInfo.cache) {

			    // close/cache the previous component
			    if (previousRouteInfo && previousRouteInfo.component) {
			        routeCache.components[previousRouteInfo.component].close(previousRouteInfo.component);
			    }

			    // create the component if not yet created
			    if (!currentRouteInfo.component) {
			        currentRouteInfo.component = name;
			        if (!component) {
			            component = routeCache.components[name] = context.instantiate(name);
			        }
			    }

			    // determine the cache setting
			    // default the cache setting to cache if no arguments
			    options = options || {};
			    options.cache = currentRouteInfo.cache = (options.cache === void(0)) ?
			        argsMatch : options.cache;

                routeCache.routes[routeCache.currentRoute].previousArgs = routeCache.currentRouteArgs;

			    // render the component
			    component.view = component.render(name, options);
			}

			url = routerInfo.routeUrl(routeCache.currentRoute, routeCache.currentRouteArgs);
			navigateOptions = {
				replace: currentRouteInfo.replaceHistory
			};
			if (currentRouteInfo.navigateOptions) {
				navigateOptions = currentRouteInfo.navigateOptions;
                if (typeof navigateOptions.replaceHistory !== 'undefined') {
                    navigateOptions.replace = navigateOptions.replaceHistory;
                }
				delete currentRouteInfo.navigateOptions;
			}
			this.navigate(url, navigateOptions);
			return component;
		},

        /**
         * Executes the route specified by name or pattern. An array of arguments
         * to pass to its callback can also be provided.
         * @param {string} name - the route name or pattern to execute
         * @param {Array=} [args] - arguments to pass to the callback
		 * @param {object} [navigateOptions] - options to be passed when router.navigate is called (useful for replaceHistory: true).
         */
		executeRoute: function (name, args, navigateOptions) {
			var route = this.routeCache.names[name] || name;
			var routeInfo = this.routeCache.routes[route];
			var callback = this.routes[route];
			routeInfo.navigateOptions = navigateOptions;
			callback = _.isFunction(callback) ? callback : this[routeInfo.callback];
			callback.apply(this, args || []);
		}
	};

    /**
     * Checks to see if the route's previous args are the same as the current args.
     * @param {RouteCache} routeCache
     * @returns {boolean}
     */
	function routeArgsMatch(routeCache) {
        var currentArgs = routeCache.currentRouteArgs,
			prevArgs = routeCache.routes[routeCache.currentRoute].previousArgs,
			argsMatch = prevArgs ? prevArgs.toString() === currentArgs.toString() : true;
	    return argsMatch;
	}

	function routeCurry(pattern, callback) {
		var router = this,
			routeCache = router.routeCache;

		return function () {
			var args = Array.prototype.slice.call(arguments);
			routeCache.previousRoute = routeCache.currentRoute;
			routeCache.currentRoute = pattern;
		    routeCache.currentRouteArgs = _.without(args, null);
			callback.apply(router, arguments);
		};
	}


	function addRouteMetaData(pattern, routeInfo) {

		// ensure a name, url, and callback
		routeInfo.name = routeInfo.name || pattern;
		routeInfo.url = routeInfo.url === void(0) ? pattern : routeInfo.url;
		routeInfo.callback = routeInfo.callback || routeInfo.name;
		routeInfo.replaceHistory = routeInfo.replaceHistory || false;


		// add names and routes to the routeCache
		if (routeInfo.name !== pattern) {
			if (this.routeCache.names[routeInfo.name]) {
				console.warn("The route name '" + routeInfo.name + "' will be overriden");
			}
			this.routeCache.names[routeInfo.name] = pattern;
		}
		if (this.routeCache.routes[pattern]) {
			console.warn("The route for '" + pattern + "' will be overriden");
		}
		this.routeCache.routes[pattern] = routeInfo;


		// inform routeInfo of the url
		routerInfo.setUrl(routeInfo.name, routeInfo.url, this); // name path router
		if (routeInfo.name !== pattern) {
			routerInfo.setUrl(pattern, routeInfo.url, this);
		}


		// set the curried function in the routes object or on the router
		if (_.isFunction(routeInfo.callback)) {
			this.routes[pattern] = routeCurry.call(this, pattern, routeInfo.callback);
		} else {
			this.routes[pattern] = routeInfo.callback;
			if (!this[routeInfo.callback].curried) {
				this[routeInfo.callback] = routeCurry.call(this, pattern, this[routeInfo.callback]);
				this[routeInfo.callback].curried = true;
			}
		}
	}

	return managedRouterExt;
}


bbext.mixin("managedRouterExt", [
	"routerInfo",
	"context",
	bbext.managedRouterExt
]);
