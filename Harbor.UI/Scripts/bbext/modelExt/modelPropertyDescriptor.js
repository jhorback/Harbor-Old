

function modelPropertyDescriptor(_, console) {

	return function (model) {
		var proto = model.constructor.prototype,
			descriptor = proto.propertyDescriptor;

		if (descriptor) {
			return descriptor;
		}

		descriptor = {
			get: {},
			set: {},
			bound: {}, // inverse of bind
			validate: {}
		};


		// don't bother if there are no defaults
		if (model.defaults) {
			
			_.each(proto, function (value, key) {
				key = safeKey(key);
				
				if (value && model.defaults[key] !== undefined) {

					if (_.isFunction(value.get)) {
						descriptor.get[key] = value.get;
					}

					if (_.isFunction(value.set)) {
						descriptor.set[key] = value.set;
					}
					
					if (value.bind && _.isFunction(value.bind) === false) {
						boundBind(descriptor, key, value.bind);
					}
					
					if (value.validate) {
						descriptor.validate[key] = value.validate;
					}
				}
			});
		}

		proto.propertyDescriptor = descriptor;
		console.debug("modelPropertyDescriptor: parse model:", model.name, "descriptor:", descriptor);
		return descriptor;
	};
	

	// allows for property descriptors to be
	// enclosed in brackets for safety
	function safeKey(key) {
		if (key.indexOf("[") === 0) {
			return key.substring(1, key.length - 1);
		}
		return key;
	}

	function boundBind(descriptor, toBound, toBind) {
		var bind = _.isArray(toBind) ? toBind : [toBind],
			bound;

		_.each(bind, function (prop) {
			bound = descriptor.bound[prop] || [];
			bound.push(toBound);
			descriptor.bound[prop] = bound;
		});
	}
}

bbext.service("modelPropertyDescriptor", ["_", "console", modelPropertyDescriptor]);