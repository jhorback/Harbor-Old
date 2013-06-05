/*
	register(name)
	
	
	
	-> alias: app.service 
			§ Just a call to context.register
	• Constructs
		○ app.construct(name, creator);
			§ Warn of collision detection when adding the symbol to the app.
		○ app[constructName](name, fn)
			§ Each constructs creation function will be exposed on the app. 
			§ App.construct("view", fn) -> app.view("viewName", fn);
	• Stitching
		○ app.use([]) -> alias: app.requires;
			§ Dependencies are an array of module names to merge.
			§ Merges IOC, construct containers
			§ Warn of collision detection?
	• Initialization
		○ app.config(fn)
			§ Registers a function which is injected with a call to launch("app")
		○ app.start(fn)
			§ Registers a function which is injected with a call to launch("app");
		○ app.start();

A call to app.start without parameters kicks off the bootstrapping process
*/
var app = (function (context) {

	var _ = {
		appCache: {},
		
		// a global variable cache used to share things across applications
		globals: {},
		
		isArray: Array.isArray || function(obj) {
			return toString.call(obj) == '[object Array]';
		},
		
		mixin: function (destination, source) {
			for (var k in source) {
				if (source.hasOwnProperty(k)) {
					destination[k] = source[k];
				}
			}
			return destination;
		},
		
		construct: function (app, creator) {
			return function (name, construct, proto, statics) {
				var retFn, protoObj;

				ext.mixin(construct.prototype, proto);
				ext.mixin(construct, statics);

				retFn = launch.call(creator, [], app);
				protoObj = retFn.apply(app, [construct]);
				if (!protoObj) {
					throw new Error("The inner construct function did not return anything.");
				}
				app.register(name, protoObj);
				return protoObj;
			};
		},
		
		bootstrap: function (appName) {
			var appvars = _.appCache(appName),
				ctx = appvars.context;
			// jch! - implement


			/*
			go through each module to use and call bootstrap
		
			guard against calling bootstrap on a module more than once
			- don't need to throw error - just skip

			share the context:
			appvars.context.registry = _.mixin(modvars.context.registry,  appvars.context.registry);
			// ALL .instance props must be deleted so the new app can create them
			// NO - see if i can guard caching for apps only

			CONFIG
			foreach fn in appvars.config
				context.call(fn, [], appvars.app);

			START
			if (appvars.app.isModule === false) { // jch! - change variable to isApp and instead of appvars.app use appvars.mod
				foreach fn in appvars.start
					context.call(fn, [], appvars.app)
				}

			*/
		},

		createApp: function (name, isModule) {

			var appvars = {
				name: name,
				app: null, 
				isModule: isModule,
				context: context.create(),
				constructs: [],
				use: [],
				config: [],
				start: []
			};
			
			appvars.context.register("context", appvars.context);
			appvars.context.register("globals", _.globals);

			appvars.app = {
				register: appvars.context.register,
				
				construct: function (constructName, creator) {
					appvars.constructs[constructName] = appvars.app[constructName] = _.construct(appvars.app, creator);
				},

				use: function (modules) {
					var i, modName, mod;

					modules = _.isArray(modules) ? modules : Array.prototype.slice.call(arguments, 0);

					for (i = 0; i < modules.length; i++) {
						modName = modules[i];
						appvars.use.push(modName);

						mod = _.appCache[modName];
						if (!mod || mod.isModule === false) {
							throw new Error("Cannont find module: " + modName);
						}
						
						// jch! - implement - add construct to app
						// feach modvars.constructs
						// create the app symbol for the construct
						// appvars.app[constructName] = modvars.constructs[constructName]
						// add it to the modules constructs in case it is to be used
						// appvars.constructs[constructName] = modvars.constructs[constructName]
					}
				},

				config: function (fn) {
					appvars.config.push(fn);
				}
			};

			if (!appvars.isModule) {
				appvars.app.start = function (fn) {
					if (arguments.length === 0) {
						_.bootstrap(name);
					} else {
						appvars.start.push(fn);
					}
				};
			}
			
			return appvars;
		}
	};


	return function (appName) {
		var isModule,
			appvars = _.appCache[appName];

		if (!appvars) {
			isModule = arguments[1] ? true : false;
			appvars = _.createApp(appName, isModule);
			_.appCache[appName] = appvars;
		}
		
		return appvars.app;
	};
}(context));


var module = (function () {

	return function (moduleName) {
		return app(moduleName, true);
	};

}());


/*
	• IOC methods
		○ app.register(name) -> alias: app.service 
			§ Just a call to context.register
	• Constructs
		○ app.construct(name, creator);
			§ Warn of collision detection when adding the symbol to the app.
		○ app[constructName](name, fn)
			§ Each constructs creation function will be exposed on the app. 
			§ App.construct("view", fn) -> app.view("viewName", fn);
	• Stitching
		○ app.use([]) -> alias: app.requires;
			§ Dependencies are an array of module names to merge.
			§ Merges IOC, construct containers
			§ Warn of collision detection?
	• Initialization
		○ app.config(fn)
			§ Registers a function which is injected with a call to launch("app")
		○ app.start(fn)
			§ Registers a function which is injected with a call to launch("app");

Context
The context is the internal ioc container.
		○ context.get(name)
		○ context.call(function)
		○ context.instantiate(constructor);
			§ If passing in the constructor function itself that will be created
			§ If passing a name, the constructor will be looked up (in the cache then globals)
		○ $inject and $construct
			§ Properties on a prototype to instruct dependencies and what construct for globals
			§ $inject can also be set as a static on the function object
*/

module("session").config(["userRepo"], function (userRepo) {
	// by injecting userRepo it will be global when context.registry mixin
	// unless guarding against this
	// how to $inject config and start?
});

module("session").service("userRepo", function () {


});


var session = module("session");
session.config(["dep1"], function (dep1) {
	
}, {
	$inject: ["dep1"]
});


session.service("userRepo", ["dep1"], function (dep1) {

}, {
	$inject: ["dep1"]
});