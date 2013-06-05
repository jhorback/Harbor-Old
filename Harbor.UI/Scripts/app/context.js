/*
 * context.js
 * 
 * Description:
 *     Creates an inversion of control container for JavaScript.
 *     Function dependencies are determined by their arguments, however, for obfusticated scripts
 *     an $inject property can be placed on the prototype or function itself.
 *
 * Methods:
 *     context.create() - creates a new container.
 *
 * Context methods:
 *     register(name, value) - registers an object with the container.
 *         - value can be any object or a constructor/factory function.
 *
 *     get(name)
 *         - retrieves the dependency.
 *
 *     call(method, args, context)
 *         - a utility method for satisfying the dependencies of a method directly.
 *         - the context will be applied to the method call -> 'this'
 *
 *     instantiate(constructor, args)
 *         - calls the constructor which can also be the name
 *           of a registered dependency.
 */
var context = (function () {
	var ioc = {
		INSTANTIATING: {},
		
		getFnArgs: function (fn) {
			var val = fn.$inject || fn.prototype.$inject || fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(',');
			return val[0] === "" ? [] : val;
		},

		get: function (request, name, args) {
			var reg;

			name = name.replace(/^\s+|\s+$/g, ''); // trim
			reg = request.context.registry[name];
			if (!reg) {
				throw new Error("Unknown dependency: " + name);
			}
			if (reg.instance) {
				return reg.instance;
			}

			// if the value is not a function, use it as the instance
			if (reg.value instanceof Function === false) {
				reg.instance = reg.value;
				return reg.instance;
			}

			reg.instance = ioc.instantiate(request, reg.value, args);
			return reg.instance;
		},

		instantiate: function (request, constructor, args) {
			var instance, injectedInstance, returnValue;

			injectedInstance = function () { };
			injectedInstance.prototype = constructor.prototype;
			instance = new injectedInstance;

			returnValue = ioc.call(request, constructor, args, instance);
			return returnValue || instance;
		},

		call: function (request, method, args, context) {
			var resolved, deps, t, start;

			args = args || [];
			resolved = Array.prototype.slice.call(args, 0); // clones the array
			start = resolved.length;
			deps = ioc.getFnArgs(method);
			for (t = start; t < Math.max(deps.length, args.length) ; t++) {
				args[t] !== undefined ?
					resolved.push(args[t]) :
					resolved.push(request.get(deps[t]));
			}

			return method.apply(context, resolved);
		},

		createRequest: function (context) {
			return {
				visited: {},
				visitedArray: [],
				context: context,
				get: function (name, args) {
					this.visitedArray.push(name);
					if (this.visited[name] === ioc.INSTANTIATING) {
						throw new Error("Circular reference: " + this.visitedArray.join(" -> "));
					}

					this.visited[name] = ioc.INSTANTIATING;
					return this.visited[name] = ioc.get(this, name, args);
				}
			};
		}
	};

	return {
		create: function () {
			return {
				registry: {},

				register: function (name, value) {
					var reg, key;

					if (arguments.length === 1) {
						reg = arguments[0];
						for (key in reg) {
							this.register(key, reg[key]);
						}
					} else {
						this.registry[name] = {
							value: value
						};
					}
				},

				get: function (name) {
					var request = ioc.createRequest(this);
					return request.get(name);
				},

				call: function (method, args, context) {
					var request = ioc.createRequest(this);
					return ioc.call(request, method, args, context);
				},

				instantiate: function (constructor, args) {
					var name, request, reg;

					if (typeof arguments[0] === "string") {
						name = arguments[0];
						reg = this.registry[name];
						if (!reg) {
							throw new Error("Could not instantiate type not found: " + name);
						}
						constructor = reg.value;
					}

					request = ioc.createRequest(this);
					return ioc.instantiate(request, constructor, args);
				}
			};
		}
	};
}());