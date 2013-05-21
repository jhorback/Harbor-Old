/*
 * IOC.js
 * 
 * Description:
 *     Inversion of control container for JavaScript.
 *
 * Methods:
 *     register(name, value) - registers an object with the container.
 *         - value can be any object or a 'newable' prototype.
 *         - plain functions cannot be used a dependencies.
 *     get(name)
 *         - retrieves the dependency. If a prototype, will satisfy all dependencies of the constructor.
 *     call(method, args, context)
 *         - a utility method for satisfying the dependencies of a method directly.
 */
var IOC;
(function () {
	var ioc = {
		registry: {},
		
		getFnArgs: function (fn) {
			var val = fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(',');
			return val[0] === "" ? [] : val;
		},
		
		get: function (name, request) {
			var t, deps, resolved, reg, instance,
				injectedInstance, returnValue;

			name = name.replace(/^\s+|\s+$/g, ''); // trim
			reg = request.container[name];
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

			resolved = [];
			deps = ioc.getFnArgs(reg.value);
			for (t = 0; t < deps.length; t++) {
				resolved.push(request.get(deps[t], request));
			}

			injectedInstance = function () { };
			injectedInstance.prototype = reg.value.prototype;
			instance = new injectedInstance;

			returnValue = reg.value.apply(instance, resolved);
			// reg.instance = instance;
			reg.instance = returnValue || instance;
			return reg.instance;
		}
	};
	

	ioc.Request = function (container, getFn) {
		this.visited = {};
		this.visitedArray = [];
		this.getFn = getFn;
		this.container = container;
	};

	ioc.Request.prototype = {
		get: function (name) {
			this.visitedArray.push(name);
			if (this.visited[name]) {
				throw new Error("Circular reference: " + this.visitedArray.join(" -> "));
			}
			this.visited[name] = true;
			return this.getFn(name, this);
		}
	};
	

	IOC = {
		register: function (name, value) {
			var reg, key;
			if (arguments.length === 1) {
				reg = arguments[0];
				for (key in reg) {
					IOC.register(key, reg[key]);
				}
			} else {
				ioc.registry[name] = {
					value: value
				};
			}
		},
		
		get: function (name) {
			var request = new ioc.Request(ioc.registry, ioc.get);
			return request.get(name);
		},
		
		call: function (method, args, context) {
			var resolved, deps, t, request;
			
			args = args || [];
			request = new ioc.Request(ioc.registry, ioc.get);
			resolved = [];
			deps = ioc.getFnArgs(method);
			for (t = 0; t < Math.max(deps.length, args.length); t++) {
				args[t] !== undefined ? 
					resolved.push(args[t]) :
					resolved.push(request.get(deps[t], request));
			}
			
			return method.apply(context, resolved);
		},
		
		// for testing
		clear: function () {
			ioc.registry = {};
		}
	};
}());