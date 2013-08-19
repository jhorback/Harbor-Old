/*
 * modelBinder
 *     modelBinder.create(model, el);
 *
 *     Binds an element to a model.
 *
 *     Binds to the model property using:
 *     1) data-bind="attributeName"
 *     2) name="attributeName"
 *     3) id="attributeName"
 *
 *     Type processing:
 *     Processing data from the view to model or model to view is done by a binding type.
 *     1) data-type="someType"
 *     2) type="someType"
 *     3) tag name
 *     
 */
var modelBinder = function ($, _, config) {

	var modelBinder, _private, $, _, config;

	modelBinder = {
		create: function (model, el) {
			return new ModelBinder(model, el);
		}
	};


	function ModelBinder(model, el) {

		if (!model) {
			return;
		}

		this.model = model;
		this.$el = $(el);
		if (this.$el.data("modelbound") === true) {
			this.unbind();
		}
		this.$el.data("modelbound", true);
		// this.attrs = attrs || ModelBinder.config.attributes;
		this.bindings = {};
		this._modelToViewProxy = $.proxy(_private.modelToView, this);
		this.model.bind("change", this._modelToViewProxy);
		_private.init.apply(this);
		return this;
	};

	ModelBinder.prototype = {
		model: null, // holds the model
		$el: null, 	// stores the container that is being bound
		bindings: {}, // stores binding elements by name (each value is an array of elements).

		updateEl: function (el, name, value) {
			var binding, set;

			el = $(el);
			if (el.is(":focus")) {
				return;
			}
			binding = el.data("binding");
			if (!binding) {
				this.unbind();
				return;
			}
			value = value === null ? "" : value;

			if (binding.name === name) {
				set = (config.types[binding.type] && config.types[binding.type].set) || config.types["default"].set;
				set.call(this, el, value);
			}

			// set the attributes
			if (binding.attrs) {
				$.each(binding.attrs, $.proxy(function (attr, modelPropertyName) {
					var attrType, setter;

					if (modelPropertyName === name) {
						attrType = config.attributes[attr];
						setter = config.attributeTypes[attrType];
						setter(el, attr, value);
					}
				}, this));
			}
		},

		unbind: function () {
			this.$el.find("[data-bind],[name],[id]").unbind(".modelbinder");
			this.model.unbind("change", this._modelToViewProxy);
			this.$el.data("modelbound", false);
		},

		off: function () {
			this.unbind();
		}
	};
	
	_private = {
		init: function () {
			var $els, viewToModelProxy,
				instance = this;

			viewToModelProxy = $.proxy(_private.viewToModelFromEvent, this);
			$els = this.$el.find("[data-bind],[name],[id]");

			// build the bindings 
			$.each($els, $.proxy(function (index, el) {
				var name, type, changeEvent, val;

				el = $(el);
				name = el.attr("data-bind") || el.attr("name") || el.attr("id");
				if (!name) {
					return; // continue;
				}

				val = this.model.get(name);
				if (val === undefined) {
					return; // continue - do not add binding for an undefined attr
				}

				type = el.attr("data-type") || el.attr("type") || el[0].tagName.toLowerCase();
				el.data("binding", {
					name: name,
					type: type
				});

				_private.addBinding.call(instance, name, el);

				changeEvent = _private.getChangeEvent.call(instance, el, type);
				if (changeEvent) {
					_.each(changeEvent, function (event) {
						el.bind(event + ".modelbinder", viewToModelProxy);
					});
				}

				// set the initial value
				this.updateEl(el, name, this.model.get(name));

			}, this));

			_private.initAttrBindings.apply(this);
			_private.updateFromView.apply(this);
		},

		getChangeEvent: function (el, type) {
			var configEv = config.types[type],
		        event = (configEv && configEv.event) || "change",
				attrEv = el.attr("data-bind-event"); // event override in markup
			event = attrEv || event;
			return _.isArray(event) ? event : [event];
		},

		initAttrBindings: function () {
			var instance = this;
			
			$.each(config.attributes, $.proxy(function (attr, type) {

				var els = this.$el.find("[data-bind-" + attr + "]");
				$.each(els, $.proxy(function (i, el) {
					var name, binding;

					el = $(el);
					name = el.attr("data-bind-" + attr);
					binding = el.data("binding") || {};
					if (!binding.attrs) {
						binding.attrs = {};
					}
					binding.attrs[attr] = name;
					el.data("binding", binding);

					_private.addBinding.call(instance, name, el);

					this.updateEl(el, name, this.model.get(name));
				}, this));

			}, this));
		},

		updateFromView: function () {
			/// <summary>Used to capture autofill values that do not trigger a change event.</summary>
			var self = this;
			setTimeout(function () {
				_.each(self.bindings, function (binding, propName) {
					_.each(binding, function (el) {
						if (el.is(":text,:password,select")) {
							_.private.viewToModel.call(self, el);
						}
					});
				});
			}, 500);
		},

		addBinding: function (name, el) {
			this.bindings[name] = this.bindings[name] || [];
			this.bindings[name].push(el);
		},

		viewToModelFromEvent: function (event) {
			_private.viewToModel.call(this, $(event.target), event);
		},

		viewToModel: function (el, event) {
			var binding = el.data("binding"),
				get,
				val,
				opts;

			if (!binding) {
				return;
			}

			get = (config.types[binding.type] && config.types[binding.type].get) || config.types["default"].get;

			// don't trigger a change if the initial model value is falsy
			val = get.call(this, el, event, binding);
			if (val === "" && !this.model.get(binding.name)) {
				opts = { silent: true };
			}
			this.model.set(binding.name, val, opts);
		},

		modelToView: function (model) {
			var name, els, newVal;

			_.each(model.changed, function (value, key) {
				name = key;
				els = this.bindings[name];
				if (els) {
					newVal = model.get(name);
					$.each(els, $.proxy(function (index, el) {
						this.updateEl(el, name, newVal);
					}, this));
				}
			}, this);
		},
	};

	return modelBinder;

};


context.module("bbext").service("modelBinder", ["$", "_", "modelBinderConfig", bbext.modelBinder = modelBinder]);