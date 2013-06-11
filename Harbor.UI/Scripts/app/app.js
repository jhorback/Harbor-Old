/*
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

		isArray: Array.isArray || function (obj) {
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

				creator = _.handleInject(creator);
				retFn = modvars.context.call(creator, [], module);
				protoObj = retFn.apply(module, [construct, name]);
				if (!protoObj) {
					throw new Error("The inner construct function did not return anything.");
				}
				module.register(name, protoObj);
				return protoObj;
			};
		},

		mixinRegistries: function (dest, src) {
			_.mixin(dest, src, function (name, i1, i2) {
				// don't copy if it is the context, globals, or already defined
				delete i2.instance; // make sure to not carry over any created instances
				if (name === "context" || name === "globals" || dest[name]) {
					return false;
				}
				return true;
			});
		},

		bootstrap: function (moduleName, bootstrapped) {
			var modvars = _.modCache[moduleName],
			    ctx = modvars.context,
			    use = modvars.use,
			    i,
			    useModName;


			// bootstrap dependent modules first
			// bootstrapped - guard against calling bootstrap on a module more than once
			bootstrapped = bootstrapped || {};
			for (i = 0; i < use.length; i++) {
				useModName = use[i];
				if (!bootstrapped[useModName]) {
					bootstrapped[useModName] = true;
					_.bootstrap(use[i], bootstrapped);
				}
				_.mixinRegistries(modvars.context.registry, _.modCache[useModName].context.registry);
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
					modvars.context.register.apply(modvars.context, arguments);
					return this;
				},

				construct: function (constructName, creator) {
					modvars.constructs[constructName] = modvars.instance[constructName] = _.construct(modvars, creator);
					return this;
				},

				use: function (modules) {
					var i, modName, usemodvars, ctx;

					modules = _.isArray(modules) ? modules : Array.prototype.slice.call(arguments, 0);
					ctx = modvars.context;

					for (i = 0; i < modules.length; i++) {
						modName = modules[i];
						modvars.use.push(modName);

						usemodvars = _.modCache[modName];
						if (!usemodvars || usemodvars.isApp === true) {
							throw new Error("Cannont find module: " + modName); // jch! - test this too
						}

						// mixin the constructs
						_.mixin(modvars.constructs, usemodvars.constructs, function (name, i1, i2) {
							if (modvars.constructs[name]) {
								return false;
							}
							modvars.instance[name] = i2;
							return true;
						});

						_.mixinRegistries(ctx.registry, usemodvars.context.registry);
					}
					return this;
				},

				config: function (fn) {
					modvars.config.push(_.handleInject(fn));
					return this;
				},

				call: function (fn) { // jch! - need to document and test - allows external code to use app dependencies
					modvars.context.call(_.handleInject(fn));
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
					return this;
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