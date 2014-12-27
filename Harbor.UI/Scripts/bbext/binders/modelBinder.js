/*
 * modelBinder
 *     modelBinder.create(model, el);
 *
 *     Binds an elements "value" to a model.
 *
 *     Binds to the model property using:
 *     1) data-bind="attributeName"
 *     2) name="attributeName"
 *     3) id="attributeName"
 *
 *     Attribute binding syntax: data-bind="attributeName: modelPropertyName"
 *     When binding values and attributes use name or id for the value:
 *        <input type="text" name="userName" data-bind="disabled: userNameDisabled" />
 *     Or you can do it inline:
 *        <input type="text" data-bind="value: userName, disabled: userNameDisabled" />
 *
 *     Type processing:
 *     Processing data from the view to model or model to view is done by a binding type.
 *     The type handlers are in the modelBinderConfig.
 *     1) data-type="someType"
 *     2) type="someType"
 *     3) tag name
 *
 *     Event overriding:
 *     1) data-bind-event="eventName"
 *
 *     The modelBinderConfig can be configured to enable additional value and attribute types.
 */
var modelBinder = function ($, _, config, nameValueParser) {

	var modelBinder, _private, pageLoaded;

	modelBinder = {
		create: function (model, el, matches) {
			return new ModelBinder(model, el, matches);
		},

		updateEl: function (el) {
			var binding = $(el).data("binding");
			if (binding) {
				binding.binder.updateEl(el);
			}
		}
	};

	// matches come from the modelBinderShim
	//

	function ModelBinder(model, el, matches) {

		if (!model) {
			return this;
		}

		this.$el = $(el);
		matches = matches || el.find("[data-bind]:not([data-templatefrom]),[name],[id]").addBack("[data-bind]");
		if (matches.length === 0) {
			return this;
		}

		this.matches = matches;
		this.model = model;

		if (this.$el.data("modelbound") === true) {
			this.unbind();
		}

		this.$el.data("modelbound", true);
		// this.attrs = attrs || ModelBinder.config.attributes;
		this.bindings = {};
		this.models = {};
		this._modelToViewProxy = $.proxy(_private.modelToView, this);
		_private.init.call(this);
		return this;
	};

	ModelBinder.prototype = {
		model: null, // holds the model
		models: {}, // holds all bound models
		$el: null, 	// stores the container that is being bound
		bindings: {}, // stores binding elements by name (each value is an array of elements).
		updateEl: function (el, name, value) { // name and value are optional
			var binding, set, haveValue = value !== undefined;

			el = $(el);
			if (el.is(":focus:not(:button)")) {
				return;
			}

			binding = el.data("binding");
			if (!binding) {
				this.unbind();
				return;
			}

			value = value === null ? "" : value;

			// if we have a binding name and the name attribute is not passed or is the same as the binding name then update
			if (binding.name && (!name || binding.name === name)) {
				set = (config.types[binding.type] && config.types[binding.type].set) || config.types["default"].set;
				set.call(this, el, haveValue ? value : this.get(binding.name));
			}

			// set the attributes
			if (binding.attrs) {
				$.each(binding.attrs, $.proxy(function (attr, modelPropertyName) {
					var attrType, setter;

					if (!name || modelPropertyName === name) {
						attrType = config.attributes[attr] || config.attributes["default"];
						setter = config.attributeTypes[attrType];
						setter(el, attr, haveValue ? value : this.get(modelPropertyName));
					}
				}, this));
			}
		},

		unbind: function () {
			if (!this.$el) {
				return;
			}
			this.matches && this.matches.unbind(".modelbinder");
			_.each(this.models, function (model, name) {
				model.unbind("change", this._modelToViewProxy);
			}, this);
			this.$el.data("modelbound", false);
		},

		get: function (name) {
			var binding = this.bindings[name];
			return binding ? binding.model.get(binding.attr) : void(0);
		},

		set: function (name, value) {
			var binding = this.bindings[name];
			if (binding) {
				binding.model.set(binding.attr, value);
			}
		},

		off: function () {
			this.unbind();
		}
	};

	_private = {
		init: function () {
			var $els = this.matches,
				viewToModelProxy = $.proxy(_private.viewToModelFromEvent, this);

			// build the bindings
			$els.each($.proxy(function (index, el) {

				_private.parseBindEl.call(this, el, viewToModelProxy);

			}, this));

			_private.updateFromView.apply(this);
		},

		parseBindEl: function (el, viewToModelProxy) {
			var instance = this,
			    attr,
                type,
			    bindTo,
			    binding = { attrs: {}, binder: this },
			    changeEvent;

			el = $(el);
			attr = el.attr("data-bind");
			if (attr === "false") {
				return;
			}

			bindTo = nameValueParser.parse(attr, "value");
			if (("value" in bindTo) === false) {
				bindTo.value = el.attr("name") || el.attr("id");
			}

			$.each(bindTo, $.proxy(function (what, modelProperty) {
				if (what.toLowerCase() === "value") { // value/type binding

					binding.name = modelProperty;
					binding.type = type = el.attr("data-type") || el.attr("type") || el[0].tagName.toLowerCase();
					if (_private.addBinding.call(instance, modelProperty, el) === false) {
						delete binding.name;
						delete binding.type;
					} else {
                        binding.options = $.extend({}, (config.types[type] && config.types[type].options) || {}, nameValueParser.parse(el.attr("data-bind-options")) || {});
                    }
				} else { // attribute binding

					binding.attrs[what] = modelProperty;
					if (_private.addBinding.call(instance, modelProperty, el) === false) {
						delete binding.attrs[what];
					}
				}

			}, this));

			el.data("binding", binding);
			this.updateEl(el);

			// hook up the change event(s)
			changeEvent = binding.type && _private.getChangeEvent(el, binding.type);
			if (changeEvent) {
				_.each(changeEvent, function (event) {
					el.bind(event + ".modelbinder", viewToModelProxy);
				});
			}
		},

		getChangeEvent: function (el, type) {
			var configEv = config.types[type],
		        event = (configEv && configEv.event) || "change",
				attrEv = el.attr("data-bind-event"); // event override in markup
			event = attrEv || event;
			return _.isArray(event) ? event : [event];
		},

		updateFromView: function () {
			/// <summary>Used to capture autofill values that do not trigger a change event.</summary>
			var self = this,
			    update;

			update = function () {
				// pageLoaded = true; jch* testing delay
				_.each(self.bindings, function (binding, propName) {
					_.each(binding.els, function (el) {
						if (el.is(":text,:password,select")) {
							_private.viewToModel.call(self, el);
						}
					});
				});
			};

			if (!pageLoaded) {
				setTimeout(update, 500);
			} else {
				update();
			}
		},

		// add the binding - returns true only if there is a attribute on the model
		// supports nested models
		addBinding: function (name, el) {
			var binding;

			if (!name) {
				return false;
			}

			if (!this.bindings[name]) {
				binding = _private.initBinding.call(this, name);
				if (!binding) {
					return false;
				}
				this.bindings[name] = binding;

				// create reference on the model for model-to-view binding
				binding.model.bindings = binding.model.bindings || {};
				binding.model.bindings[binding.attr] = name;
			}
			this.bindings[name].els.push(el);
			return true;
		},

		initBinding: function (name) {
			//
			var model = this.model, attr, i, parts;

			if (name.indexOf(".") === -1) {
				model = this.model;
				attr = name;
			} else {
				parts = name.split(".");
				for (i = 0; i < parts.length; i++) {
					attr = parts[i];
					if (i !== parts.length - 1) {
						model = model[attr];
					}
				}
			}

			// bindings must be on models
			if (model.attributes[attr] === void(0)) {
				return null;
			}

			if (!this.models[model.name]) {
				model.bind("change", this._modelToViewProxy);
				this.models[model.name] = model;
			}
			return {
				name: name,
				els: [],
				model: model,
				attr: attr
			};
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
			if (val === "" && !this.get(binding.name)) {
				opts = { silent: true };
			}
			this.set(binding.name, val, opts);
		},

		modelToView: function (model) {
			var name, els, newVal;

			_.each(model.changed, function (value, key) {
				name = model.bindings && model.bindings[key];
				els = this.bindings[name] && this.bindings[name].els;
				if (els) {
					newVal = this.get(name);
					$.each(els, $.proxy(function (index, el) {
						this.updateEl(el, name, newVal);
					}, this));
				}
			}, this);
		}
	};

	return modelBinder;

};


context.module("bbext").service("modelBinder", ["$", "_", "modelBinderConfig", "nameValueParser", bbext.modelBinder = modelBinder]);
