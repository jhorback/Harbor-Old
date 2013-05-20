var IOC;

(function () {
	var ioc = {
		registry: {},
		getFnArgs: function (fn) {
			var val = fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(',');
			return val[0] === "" ? [] : val;
		}
	};

	IOC = {
		register: function (name, value) {
			ioc.registry[name] = {
				value: value
			};
		},
		
		get: function (name) {
			var t, len, deps, resolved, reg, instance,
				injectedInstance, returnValue;
			
			reg = ioc.registry[name];
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
			for (t = 0, len = deps.length; t < len; t++) {
				resolved.push(IOC.get(deps[t]));
			}
			

			injectedInstance = function () { };
			injectedInstance.prototype = reg.value.prototype;
			instance = new injectedInstance;

			returnValue = reg.value.apply(instance, resolved);
			reg.instance = instance;
			//reg.instance = returnValue || instance;
			return reg.instance;
		}
	};


}());



/*
	• register(name, object)
	• get(name)
	• call(method, context, parameters)
		○ Used to inject a method
		○ Any supplied parameters will be used over injected parameters.
*/