

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
			validate: {},
			boundAttributes: {},   // key: attribute to listen for; value: list of attributes to refresh
			boundAssociations: {}  // key: attribute name to refresh;
			                       // value: hash whose key is the association name and value is the events to listen for
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
					
					// alias: observe, bind
					if ((value.observe || value.bind) && _.isFunction(value.bind) === false) {
						boundBind(descriptor, key, value.observe || value.bind);
					}
					
					if (value.validate) {
						descriptor.validate[key] = value.validate;
					}
				}
			});
		}

		proto.propertyDescriptor = descriptor;
		console.log("modelPropertyDescriptor: parse model:", model.name, "descriptor:", descriptor);
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

	/* observe can be a string, array, or object
	   it is de-normalized into an object in which each key is an association name and
	   each value is an array of events to listen for on that assocation.
	   There are two keywords that behave differently.
	   1) "this" - will use the current model as the association
	   2) "attributes" - will be an array of attributes to listen for change events on.

	   Examples:
	   observe: "userName" or observe: ["userName"].
	   will get transformed to => observe { "attributes": ["userName"] }

	   observe: {
		   "users": "sync request", // or ["sync", "request"],
		   "this": "request change:firstName",
	   }

	   Note (attributes is less performant but better on memory):
	   The "attributes" property is listened to differently. In every other case a single listener
	   is registered for each event to refresh the property. "attributes" sets up only a single listener
	   on the model and parses the "change:x" event to determine if a refresh needs to happen.
	*/
	function boundBind(descriptor, propertyName, observe) {
		var attributes, bound, hasBoundAssociations;

		attributes = _.isString(observe) ? [observe] : _.isArray(observe) ? observe : null;
		hasBoundAssociations = !attributes;
		
		if (hasBoundAssociations && observe.attributes) {
			attributes = _.isArray(observe.attributes) ? observe.attributes : [observe.attributes];
			delete observe.attributes;
			hasBoundAssociations = !_.isEmpty(observe);
		}

		// invert the attributes in "boundAttributes": { "attrToListenTo": ["attributesToRefresh"] }
		_.each(attributes, function (prop) {
			bound = descriptor.boundAttributes[prop] || [];
			bound.push(propertyName);
			descriptor.boundAttributes[prop] = bound;
		});

		if (hasBoundAssociations) {
			descriptor.boundAssociations[propertyName] = observe;
		}
	}
}

bbext.service("modelPropertyDescriptor", ["_", "console", modelPropertyDescriptor]);