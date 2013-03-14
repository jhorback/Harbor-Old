/*
 * GetSetModelExtension.js
 * 
 * Description:
 *     Adds getters and setters to models.
 *     Also adjusts the toJSON method to return calculated values.
 *     and provides a refresh method to force a change on the calculated values.
 *
 * Usage:
 *    var SomeModel = Backbone.Model.extend({
 *        initialize: function () {
 *            GetSetModelExtension.extend(this);
 *        },
 *        myProp: {
 *            get: function (currentValue) {
 *                return currentValue; // default behavior
 *            },
 *            set: function (value) {
 *                return value; // default behavior
 *            },
 *            // triggers a change on the property if any of the 'bind' properties change
 *            bind: "someProperty" // can be an array for multiple properties
 *        }  
 *    });
 */
(function () {
	var extension = {
		get: function (name) {
			var val,
				getFn = this[name] && this[name].get,
				currentValue = Backbone.Model.prototype.get.apply(this, arguments);
			
			if (_.isFunction(getFn) && getFn !== extension.get) {
				val = getFn.call(this, currentValue);
				if (val !== undefined) {
					this.attributes[name] = val; // keep the attrs in sync - may not need?
				}
			} else {
				val = currentValue;
			}
			return val;
		},

		set: function (name, value, options) {
			var setFn, model = this;

			if (_.isObject(name)) {
				options = arguments[1];
				_.each(arguments[0], function (value, name) {
					model.set(name, value, options);
				});
				return this;
			}


			setFn = $.isPlainObject(this[name]) && this[name].set;
			value = _.isFunction(setFn) ? setFn.call(this, value, options) : value;
			Backbone.Model.prototype.set.apply(this, arguments);
			return this;
		},
		
		toJSON: function () {
			var json = { };
			var model = this;
			_.each(this.attributes, function (value, name) {
				var val = model.get(name);
				// if val is undefined use the attribute value (which is the default).
				val = val !== undefined ? val : model.attributes[name];
				json[name] = val;
			});
			return json;
		},
		
		refresh: function () {
			this.set(this.toJSON());
		}
	};


	window.GetSetModelExtension = {
		
		parseBindings: function (instance) {
		    $.each(instance, function (name, value) {
		        var toBind = _.isArray(value.bind) ? value.bind : [value.bind];
				if (value && value.bind && _.isFunction(value.bind) === false) {
					_.each(toBind, function (propName) {
						instance._bindings[propName] = instance._bindings[propName] || [];
						instance._bindings[propName].push(name);
					});
				}
			});
		},
		
		handleBindings: function (instance) {
			instance.on("all", function (change) {
				var prop = change && change.split(":")[1];
				if (prop) {
					_.each(instance._bindings[prop], function (depPropName) {
					    setTimeout(function () {
					        debugger;
							instance.set(depPropName, instance.get(depPropName));
						}, 0); // yield - allow backbones this._changing flag to be reset.
					});
				}
			});
		},

		extend: function (protoOrInstance) {
			var extend = function (instance) {
					GetSetModelExtension.parseBindings(instance);
					GetSetModelExtension.handleBindings(instance);
				};
			
			_.extend(protoOrInstance, { _bindings: {} }, extension);
			if (protoOrInstance.attributes) { // this is an instance
				extend(protoOrInstance);
			} else {
			    protoOrInstance._init = protoOrInstance.initialize;
				protoOrInstance.initialize = function () {
				    extend(this);
				    this._init.apply(this, arguments);
				};
			}
		}
	};
} ());
