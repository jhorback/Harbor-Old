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


*/
function managedRouterExt(mixin, Backbone, _, context) {
	var routerMixin, managedRouterExt;
	
	managedRouterExt = {
		beforeInit: function (options) {
			
			this.routeCache = {
				currentRoute: null
			};

			// adapted from Backbone router constructor and _bindRoutes
			options || (options = {});
			if (options.routes) {
				this.routes = options.routes;
			}
			if (!this.routes) {
				return;
			}
			
			this.routes = _.result(this, 'routes');
			_.each(this.routes, function (callback, pattern) {
				callback = _.isFunction(callback) ? callback : this[callback];
				this[pattern] = this.routes[pattern] = routeCurry.call(this, pattern, callback);
			}, this);
		},
		
		/*
		    name - the name of the component to show
			options - all options used to create the component;
			    additional options include:
				*navigate - a fragment to pass to the Backbone router to keep the url in sync.
				**lifetime - static, single, instance
				**runRoute
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
	

	// this would fire immediately before showComponent
	function routeCurry(pattern, callback) {
		
		var routeInfo = this.routeCache[this.routeCache.currentRoute];
		if (routeInfo) {
			if (routeInfo.options && routeInfo.options.parentEl) {
				routeInfo.component.close(routeInfo.options.parentEl);
				// jch* may need to hide the el of the component if not region
			} else {
				routeInfo.component.close();
			}
		}

		this.routeCache.currentRoute = pattern;
		return function () {
			callback.apply(this, arguments);
		};
	}

	routerMixin = mixin("router");
	routerMixin.register("bbext.managedRouterExt", managedRouterExt);
}


bbext.config(["mixin", "Backbone", "_", managedRouterExt]);