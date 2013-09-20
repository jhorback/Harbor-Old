
function getSetModelExt(mixin, modelPropertyDescriptor) {

	var getSetModelExt = {
		
		afterInit: function () {
			this._bindings = {};
			parseBindings.call(this);
			handleBindings.call(this);
		},
		
		get: function (name) {
			var val,
				getFn = modelPropertyDescriptor(this).get(name),
				currentValue = Backbone.Model.prototype.get.apply(this, arguments);

			if (_.isFunction(getFn) && getFn !== getSetModelExt.get) {
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
			var model = this,
                multiProps,
                getValueToSet = _.bind(function (name, value) {
                	var setFn = modelPropertyDescriptor(this).set(name);
                	value = _.isFunction(setFn) ? setFn.call(this, value, options) : value;
                	return value;
                }, this);

			if (_.isObject(name)) {
				multiProps = {};
				options = arguments[1];
				_.each(arguments[0], function (value, name) {
					multiProps[name] = getValueToSet(name, value);
				}, this);
				Backbone.Model.prototype.set.call(this, multiProps, options);
				return this;
			}

			Backbone.Model.prototype.set.call(this, name, getValueToSet(name, value), options);
			return this;
		},

		toJSON: function () {
			var json = {};
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
	

	function parseBindings() {
		var model = this;
		
		$.each(this, function (name, value) {
			var toBind = modelPropertyDescriptor(model).bind(value);
			if (toBind && _.isFunction(toBind) === false) {
				toBind = _.isArray(toBind) ? toBind : [toBind];
				_.each(toBind, function (propName) {
					model._bindings[propName] = model._bindings[propName] || [];
					model._bindings[propName].push(name);
				});
			}
		});
	}

	function handleBindings() {
		this.on("all", function (change) {
			var prop = change && change.split(":")[1];
			if (prop && this.attributes[prop] !== undefined) {
				_.each(this._bindings[prop], function (depPropName) {
					this.set(depPropName, this.get(depPropName));
				}, this);
			}
		});
	}
	
	mixin("model").register("bbext.getSetModelExt", getSetModelExt);

}


bbext.config(["mixin", "modelPropertyDescriptor", getSetModelExt]);
