/// <reference path="context.js" />
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
 *     app.call(fn)
 *           - allows any function to be injected with app dependencies
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
			return Object.prototype.toString.call(obj) == '[object Array]';
		},

		mixin: function (destination, source, callback) {
			var k, ok = true;
			for (k in source) {
				if (source.hasOwnProperty(k)) {
					if (callback) {
						ok = callback(k, destination[k], source[k]);
					}
					if (ok) {
						destination[k] = source[k];
					}
				}
			}
			return destination;
		},

		handleInject: function (fnOrArray) {
			var fn;
			if (_.isArray(fnOrArray)) {
				fnOrArray = Array.prototype.slice.call(fnOrArray);
				fn = fnOrArray.pop();
				fn.$inject = fnOrArray;
			} else {
				fn = fnOrArray;
			}
			return fn;
		},

		construct: function (modvars, constructName, creator) {

			return function (name, construct, proto) {

				// don't require a constructor (if just an empty function)
				if (typeof construct !== "function" && !_.isArray(construct)) {
					proto = arguments[1];
					construct = function () { };
				}

				modvars.constructInstances.push({
					_: constructName + ":" + name,
					constructName: constructName,
					name: name,
					construct: construct,
					proto: proto,
					creator: creator
				});
			};
		},

		registerConstruct: function (appvars, constructInstance) {
			var retFn, protoObj, app,
			    name = constructInstance.name,
			    construct = constructInstance.construct,
			    proto = constructInstance.proto,
			    creator = constructInstance.creator;

			app = appvars.instance;
			construct = _.handleInject(construct);
			_.mixin(construct.prototype, proto);

			creator = _.handleInject(creator);
			retFn = appvars.context.call(creator, [], app);
			protoObj = retFn.apply(app, [name, construct]);
			if (!protoObj) {
				throw new Error("The inner construct function did not return anything.");
			}
			app.register(name, protoObj);
			app.register(name + ".construct", protoObj, "object"); // jch* add test - making available the raw construct through injection and document
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

		foreachUse: function (appvars, moduleName, callback, visited) {
			var i, useModName, usemodvars, len,
			    modvars = _.modCache[moduleName],
			    use = modvars.use;

			// mixed - guard against calling on a module more than once
			visited = visited || {};
			len = use.length;
			for (i = 0; i < len; i++) {
				useModName = use[i],
				usemodvars = _.modCache[useModName];

				if (!visited[useModName]) {
					if (!usemodvars || usemodvars.isApp === true) {
						throw new Error("Cannont find module: " + useModName);
					}
					visited[useModName] = true;
					_.foreachUse(appvars, use[i], callback, visited);
				}
			}

			callback(modvars);
		},

		registerAppConstructs: function (appvars, moduleName) {
			_.foreachUse(appvars, moduleName, function (modvars) {
				for (var i = 0; i < modvars.constructInstances.length; i++) {
					_.registerConstruct(appvars, modvars.constructInstances[i]);
				}
			});
		},

		mixinAppRegistries: function (appvars) {
			_.foreachUse(appvars, appvars.name, function (modvars) {
				_.mixinRegistries(appvars.context.registry, modvars.context.registry);
			});
		},

		bootstrap: function (appvars, moduleName) {
			var i, len, ctx = appvars.context;

			_.foreachUse(appvars, moduleName, function (modvars) {
				// inject and execute config methods
				len = modvars.config.length;
				for (i = 0; i < len; i++) {
					ctx.call(modvars.config[i], [], modvars.instance);
				}

				// inject and execute start methods if an app
				if (modvars.isApp) {
					len = modvars.start.length;
					for (i = 0; i < len; i++) {
						ctx.call(modvars.start[i], [], modvars.instance);
					}
				}
			});
		},

		createModule: function (name, isApp) {

			var modvars = {
				name: name,
				instance: null,
				isApp: isApp,
				context: context.create(),
				constructs: {},
				constructInstances: [],
				use: [],
				config: [],
				start: []
			};

			modvars.context.name = name;
			modvars.context.registry._name = name; // testing
			if (isApp) {
				modvars.context.register("context", modvars.context);
				modvars.context.register("appName", name);
			}
			modvars.context.register("globals", _.globals);

			modvars.instance = {
				register: function () {
					modvars.context.register.apply(modvars.context, arguments);
					return this;
				},

				construct: function (constructName, creator) {
					modvars.constructs[constructName] = creator;
					modvars.instance[constructName] = _.construct(modvars, constructName, creator);
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
							throw new Error("Module to use cannot be found:", modName);
						}

						// mixin the constructs
						_.mixin(modvars.constructs, usemodvars.constructs, function (name, i1, i2) {
							if (!modvars.constructs[name]) {
								// expose the construct on the instance
								// e.g. app.view: instance[name] where name is view
								modvars.instance[name] = _.construct(modvars, name, i2);
							}

							// using the mixin method as an object iterator
							// return false so it does nothing more
							return false;
						});

						_.mixinRegistries(ctx.registry, usemodvars.context.registry);
						this.use(usemodvars.use);
					}
					return this;
				},

				config: function (fn) {
					modvars.config.push(_.handleInject(fn));
					return this;
				}
			};

			if (modvars.isApp) {
				modvars.instance.start = function (fn) {
					if (arguments.length === 0) {
						if (!modvars.started) {
							_.registerAppConstructs(modvars, name);
							_.mixinAppRegistries(modvars);
							_.bootstrap(modvars, name);
						}
						modvars.started = true;
					} else {
						modvars.start.push(_.handleInject(fn));
					}
					return this;
				};

				modvars.instance.call = function (fn) {
					modvars.context.call(_.handleInject(fn));
				};
			}

			modvars.instance.construct("service", function () {
				return function (name, construct) {
					return construct;
				};
			});

			return modvars;
		}
	};

	window.appDebug = function () {
		return _.modCache;
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
		return context.module(appName, true);
	};
}());


context.app = app;
context.module = module;