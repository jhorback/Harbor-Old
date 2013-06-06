﻿/*
 * app.js
 *
 * Description:
 *     Facilitates the create of modules and apps.
 * 
 * Methods:
 *     module(moduleName)
 *         - creates/references the module by name.
 *     app(appName)
 *         - create/references the app by name.
 *
 * App/Module methods:
 *     module.register(name, value)
 *         - a call to register on the internal context object.
 *     module.construct(name, creator)
 *         - Creates a construct to be used by the module.
 *     module.use(moduleDependencies)
 *         - Any number of arguments (or an array) of dependent module names.
 *     module.config(fn)
 *          - registers a config method to execute before application start.
 *          - fn can be injected using the array notation
 *
 * App methods:
 *     app.start(fn)
 *          - registers a start method to execute after all configuration methods have executed.
 *          - fn can be injected using the array notation
 *
 *     app.start()
 *          - calling start without arguments 'starts' the app bootstrapping process.
 *
 * Available services:
 *     context - the ioc container for the app
 *     globals - a global cache shared accross apps.
 *
 * Available constructs:
 *     service - a simple call to register.
 */
var module = (function (context) {

	var _ = {
		modCache: {},
		
		// a global variable cache used to share things across applications
		globals: {},
		
		isArray: Array.isArray || function(obj) {
			return toString.call(obj) == '[object Array]';
		},
		
		mixin: function (destination, source, callback) {
			var k, ok = true;
			for (k in source) {
				if (source.hasOwnProperty(k)) {
					if (callback) {
						ok = callback(k, destination[k], source[k]);
					}
					if (ok) {
						// callback && console.log("COPY: ", k, "source", source[k], "destination", destination[k]);
						destination[k] = source[k];
					}
				}
			}
			return destination;
		},
		
		handleInject: function (fnOrArray) {
			var fn;
			if (_.isArray(fnOrArray)) {
				fn = fnOrArray.pop();
				fn.$inject = fnOrArray;
			} else {
				fn = fnOrArray;
			}
			return fn;
		},
		
		construct: function (modvars, creator) {
			return function (name, construct, proto) {
				var retFn, protoObj, module;
				
				module = modvars.instance;
				construct = _.handleInject(construct);
				_.mixin(construct.prototype, proto);

				retFn = modvars.context.call(creator, [], module);
				protoObj = retFn.apply(module, [construct]);
				if (!protoObj) {
					throw new Error("The inner construct function did not return anything.");
				}
				module.register(name, protoObj);
				return protoObj;
			};
		},
		
		bootstrap: function (moduleName, bootstrapped) {
			var modvars = _.modCache[moduleName],
			    ctx = modvars.context,
			    use = modvars.use,
			    i,
			    useModName,
			    useMod;
			
			// bootstrap dependent modules first
			// bootstrapped - guard against calling bootstrap on a module more than once
			bootstrapped = bootstrapped || {};
			for (i = 0; i < use.length; i++) {
				useModName = use[i];
				if (!bootstrapped[useModName]) {
					bootstrapped[useModName] = true;
					_.bootstrap(use[i], bootstrapped);
					useMod = _.modCache[useModName];
					_.mixin(ctx.registry, useMod.context.registry, function (name, i1, i2) {
						// don't copy if it is the context, globals, or already defined
						if (name === "context" || name === "globals" || i2[name]) {
							return false;
						}
						delete i2.instance; // make sure to not carry over any created instances
						return true;
					});
				}
			}
			
			// inject and execute config methods
			for (i = 0; i < modvars.config.length; i++) {
				ctx.call(modvars.config[i], [], modvars.instance);
			}

			// inject and execute start methods if an app
			if (modvars.isApp) {
				for (i = 0; i < modvars.start.length; i++) {
					ctx.call(modvars.start[i], [], modvars.instance);
				}
			}
		},

		createModule: function (name, isApp) {

			var modvars = {
				name: name,
				instance: null, 
				isApp: isApp,
				context: context.create(),
				constructs: {},
				use: [],
				config: [],
				start: []
			};
			
			modvars.context.register("context", modvars.context);
			modvars.context.register("globals", _.globals);

			modvars.instance = {
				register: function () {
					return modvars.context.register.apply(modvars.context, arguments);
				},
				
				construct: function (constructName, creator) {
					modvars.constructs[constructName] = modvars.instance[constructName] = _.construct(modvars, creator);
				},

				use: function (modules) {
					var i, modName, usemodvars;

					modules = _.isArray(modules) ? modules : Array.prototype.slice.call(arguments, 0);

					for (i = 0; i < modules.length; i++) {
						modName = modules[i];
						modvars.use.push(modName);

						usemodvars = _.modCache[modName];
						if (!usemodvars || usemodvars.isApp === true) {
							throw new Error("Cannont find module: " + modName); // jch! - test this too
						}

						_.mixin(modvars.constructs, usemodvars.constructs, function (name, i1, i2) {
							if (i2[name]) { // jch! is that right? it's the same as above.
								return false;
							}
							modvars.instance[name] = i2; // jch! - finish testing
							return true;
						});
					}
				},

				config: function (fn) {
					modvars.config.push(_.handleInject(fn));
				}
			};

			if (modvars.isApp) {
				modvars.instance.start = function (fn) {
					if (arguments.length === 0) {
						if (!modvars.started) {
							_.bootstrap(name);
						}
						modvars.started = true;
					} else {
						modvars.start.push(_.handleInject(fn));
					}
				};
			}

			modvars.instance.construct("service", function () {
				return function (construct) {
					return construct;
				};
			});
			
			return modvars;
		}
	};


	return function (moduleName) {
		var isApp,
			modvars = _.modCache[moduleName];

		if (!modvars) {
			isApp = arguments[1] ? true : false;
			modvars = _.createModule(moduleName, isApp);
			_.modCache[moduleName] = modvars;
		}
		
		return modvars.instance;
	};
}(context));


var app = (function () {

	return function (appName) {
		return module(appName, true);
	};

}());