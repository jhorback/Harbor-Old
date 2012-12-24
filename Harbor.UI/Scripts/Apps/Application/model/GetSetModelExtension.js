/*
 * GetSetModelExtension.js
 * 
 * Description:
 *     Adds getters and setters to models.
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
 *            set: function (name, value) {
 *                return value; // default behavior
 *            },
 *            bind: "someProperty" // can be an array for multiple properties
 *        }  
 *    });
 */
(function () {
	var extension = {
		get: function (name) {
			var getFn = this[name] && this[name].get;
			var currentValue = Backbone.Model.prototype.get.apply(this, arguments);
			return _.isFunction(getFn) ? getFn.call(this, currentValue) : currentValue;
		},
		
		foobar: function () {
			var jch = "testing jch!";
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
		}
	};


	window.GetSetModelExtension = {
		
		parseBindings: function (instance) {
			
			$.each(instance, function (name, value) {
				if (value && value.bind && _.isFunction(value.bind) === false) {
					_.each(_.toArray(value.bind), function (propName) {
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
							instance.set(depPropName, instance.get(depPropName));
						}, 0); // yield - allow backbones this._changing flag to be reset.
					});
				}
			});
		},

		extend: function (protoOrInstance) {
			var initProto,
			    extend = function (instance) {
					GetSetModelExtension.parseBindings(instance);
					GetSetModelExtension.handleBindings(instance);
				};
			
			_.extend(protoOrInstance, { _bindings: {} }, extension);
			if (protoOrInstance.attributes) { // this is an instance
				extend(protoOrInstance);
			} else {
				initProto = protoOrInstance.initialize;
				protoOrInstance.initialize = function () {
					extend(this);
					initProto.apply(this, arguments);
				};
			}
		}
	};
} ());
