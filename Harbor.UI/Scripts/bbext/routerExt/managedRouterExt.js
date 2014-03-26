/*
	// jch! - need to test and to document

	Usage:
	    userRouter = function () {
		}
		userRouter.prototype = {
			routes: {
				"users" : "users"
			},
			users: function () {
				this.showComponent("usersComponent", {
					parentEl: ""
				});
			}
		}


	routes: {
		"users": fn,
		"users/:id": fn
		// or -> this could be used to indicate a nested route
		"users": {
			default: fn,
			"users/:id: fn
		}
	}

	• Wrap the router functions in a closure that contains the route key.
		○ On changing route; close the current route -> routeCache[routeCache.currentRoute].component.close(<el>);
		○ <el> being the parentEl 
		○ Basically, if there is a currentRoute and it has a component, close it, set the current route, call the method -> then if showComponent is called, the component is cached so it can be closed the next go around.
			§ The route method should be called every time.
	• Implement the showComponent method.
		○ Creates the component and adds the options (passed to showComponent) cached off in the routeCache.


NOTE:
Only supports routes defined by the routes object on the router.
Does not currently support the router.route method (would have to curry that method if desired).
router.route(route, {[name, cache, url], callback});
*/
function managedRouterExt(mixin, Backbone, _, context) {
	var routerMixin, managedRouterExt;
	
	managedRouterExt = {
		beforeInit: function (options) {
			
			this.routeCache = {
				previousRoute: null,
				currentRoute: null,
				names: {},
				routes: {}
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
		},
		
		/*
		    name - the name of the component to show
			options - all options used to create the view
			    additional options include:
				region: // node/selector of the region the component should be displayed in
				cache: // boolean - determined dynamically by the arguments passed to the surrounding route method
				       // can be overridden here
		*/
		showComponent: function (name, options) {
			var component, routeInfo;
		
			// render the component
			routeInfo = this.routeCache[this.routeCache.currentRoute];
			if (routeInfo) {
				component = routeInfo.component;
			} else {
				component = context.instantiate(name, [options]);  // jch* could use a component factory
			}
			component.render(options);
			
			// cache the route info
			this.routeCache[this.routeCache.currentRoute] = {
				options: options,
				component: component
			};
			
			// navigate
			if (options.navigate) {
				this.navigate(_.results(options.navigate));
			}
			return component;
		}
	};
	

	function routeCurry(pattern, callback) {
		this.routeCache.previousRoute = this.routeCache.currentRoute;
		this.routeCache.currentRoute = pattern;
		return function () {
			callback.apply(this, arguments);
			// jch! if showComponent is not called what happens 0 anything need to be cleaned up
		};
	}


	function addRouteMetaData(pattern, routeInfo) {

		// ensure a name, url, and callback
		routeInfo.name = routeInfo.name || pattern;
		routeInfo.url = routeInfo.url || pattern;
		routeInfo.callback = routeInfo.callback || routeInfo.name;


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


		// set the curried function in the routes object or on the router
		if (_.isFunction(routeInfo.callback)) {
			this.routes[pattern] = routeCurry.call(this, pattern, routeInfo.callback);
		} else {
			this.routes[pattern] = routeInfo.callback;
			if (!this[pattern].curried) {
				this[pattern] = routeCurry.call(this, pattern, this[pattern]);
				this[pattern].curried = true;
			}
		}
	}

	routerMixin = mixin("router");
	routerMixin.register("bbext.managedRouterExt", managedRouterExt);
}


bbext.config(["mixin", "Backbone", "_", managedRouterExt]);