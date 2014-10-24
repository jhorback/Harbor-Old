

function getSetModelExt(mixin, modelPropertyDescriptor) {

	var getSetModelExt = {

		afterInit: function () {
			this._bindings = {};
			
			// add a property that let's us know that the model has been synced
			// useful for lazyloads when saving model on change
			// (don't want to save on the initial sync)
			this.synced = false;
            this.set("synced", false);
			this.on("sync", function () {
				this.synced = true;
				this.set("synced", true);
			}, this);
            this.on("request", function () {
                this.synced = false;
                this.set("synced", false);
            }, this);
			
			parseBindings.call(this);
		},

		get: function (name) {
			var val,
				getFn = modelPropertyDescriptor(this).get[name],
				currentValue = Backbone.Model.prototype.get.apply(this, arguments);

			if (getFn) {
				val = getFn.call(this, currentValue);
				if (val !== undefined && val !== currentValue) {
					Backbone.Model.prototype.set.call(this, name, val); // keep the attrs in sync
					// this.attributes[name] = val; // keep the attrs in sync
				}
			} else {
				val = currentValue;
			}
			return val;
		},

		set: function (name, value, options) {
			var model = this,
				valueToSet,
                multiProps,
                getValueToSet = _.bind(function (name, value) {
                	var setFn = modelPropertyDescriptor(this).set[name];
                	value = setFn ? setFn.call(this, value, options) : value;
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

			valueToSet = getValueToSet(name, value);
			Backbone.Model.prototype.set.call(this, name, valueToSet, options);
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

		// name: optional to only refresh a single property
		refresh: function (name) {
			if (name) {
				this.get(name);
			} else {
				this.set(this.toJSON());
			}
		},

		// returns a curry of the above refresh function.
		refreshFn: function (name) {
			var model = this;
			return function () {
				model.refresh(name);
			}
		}
	};


	function parseBindings() {
		var model = this;

		this.on("all", function (change) {
			var prop = change && change.split(":")[1],
				bindings = modelPropertyDescriptor(model).bound[prop];

			if (prop && this.attributes[prop] !== undefined && bindings) {
				_.each(bindings, function (depPropName) {
					this.set(depPropName, this.get(depPropName));
				}, this);
			}
		});
	}

	mixin("model").register("bbext.getSetModelExt", getSetModelExt);

}


bbext.config(["mixin", "modelPropertyDescriptor", getSetModelExt]);