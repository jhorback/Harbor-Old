/// <reference path="context.js" />
/*
 * module.js
 *
 * Description:
 *     Facilitates the create of modules with an entry point.
 * 
 * Methods:
 *     module(moduleName)
 *         - creates/references the module by name.
 *
 * Module methods:
 *     register(name, value)
 *         - a call to register on the internal context object.
 *     construct(name, creator)
 *         - Creates a construct to be used by the module.
 *         - A construct is an injected comosition point.
 *     use(moduleDependencies)
 *         - Any number of arguments (or an array) of dependent module names.
 *     config([fn])
 *          - registers a config method to execute before application start.
 *          - fn can be injected using the array notation
 *     start([fn])
 *          - registers a start method to execute after all configuration methods have executed.
 *          - fn can be injected using the array notation
 *     start()
 *          - calling start without arguments 'starts' the app bootstrapping process.
 *     call([fn])
 *           - allows any function to be injected with module dependencies
 *
 * Registered with every container:
 *     context - the ioc container for the app
 *     globals - a global cache shared accross apps.
 *
 * Constructs:
 *     service - a simple stateless api  
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

                // set $inject and mixin the proto
				construct = _.handleInject(construct);
				if (typeof construct !== "function") {
                    // allow for self injected constructs; jch* add test
				    proto = construct;
				    construct = function () { };
				    construct.$inject = proto.$inject;
				    construct.proto = proto;
				}
				_.mixin(construct.prototype, proto);
                	    

                modvars.constructInstances[constructName + ":" + name] = {
					// _: constructName + ":" + name,
					constructName: constructName,
					name: name,
					construct: construct,
					creator: creator
                };

			    // notify constructs that a new instance is being registered
                // jch* is there a test for this?
                creator.onRegisterCallback && creator.onRegisterCallback({
                    context: modvars.context,
                    name: name,
                    module: modvars.name,
                    isStarted: modvars.started,
                    construct: construct
                });
			};
		},

		registerConstruct: function (appvars, constructInstance) {
		    var app,
                protoObj,
                creatorFn,
			    name = constructInstance.name,
			    construct = constructInstance.construct,
			    proto = constructInstance.proto,
			    creator = constructInstance.creator;

			app = appvars.instance;
			
			creatorFn = appvars.context.call(_.handleInject(creator), [], app);            
			protoObj = creatorFn.apply(app, [name, construct]);
			if (!protoObj) {
				throw new Error("The inner construct function did not return anything.");
			}

			app.register(name, protoObj);
			app.register(name + ".construct", protoObj, "object");
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
					if (!usemodvars) {
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
		        for (var name in modvars.constructInstances) {
		            _.registerConstruct(appvars, modvars.constructInstances[name]);
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

			    // inject and execute start methods of the current module
				len = modvars.start.length;
				for (i = 0; i < len; i++) {
				    ctx.call(modvars.start[i], [], modvars.instance);
				}
			});
		},

		createModule: function (name) {

			var modvars = {
				name: name,
				instance: null,
				context: context.create(),
				constructs: {},
				constructInstances: {},
				use: [],
				config: [],
				start: [],
                started: false
			};

			modvars.context.name = name;
            modvars.context.register("context", modvars.context);
			modvars.context.register("globals", _.globals);

			modvars.instance = {
				register: function () {
					modvars.context.register.apply(modvars.context, arguments);
					return this;
				},

				construct: function (constructName, creator, onRegisterCallback) {
				    creator.onRegisterCallback = onRegisterCallback;
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
						if (!usemodvars) {
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
				},

				start: function (fn) {
				    if (arguments.length === 0) {
				        if (!modvars.started) {
				            _.registerAppConstructs(modvars, name);
				            _.mixinAppRegistries(modvars);
				            _.bootstrap(modvars, name);
				        }
				        modvars.started = true;
				    } else {
				        if (!modvars.started) {
				            modvars.start.push(_.handleInject(fn));
				        }
				    }
				    return this;
				},

                call: function (fn) {
                    modvars.context.call(_.handleInject(fn));
                }
			};

            // create a 'service' construct for simple stateless api's
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

    // module is idempotent
	return function (moduleName) {
		var modvars = _.modCache[moduleName];

		if (!modvars) {
			modvars = _.createModule(moduleName);
			_.modCache[moduleName] = modvars;
		}

		return modvars.instance;
	};
}(context));


var app = (function () {
    // app is deprecated; everything is a module.
	return function (appName) {
		return context.module(appName, true);
	};
}());

context.app = app;
context.module = module;