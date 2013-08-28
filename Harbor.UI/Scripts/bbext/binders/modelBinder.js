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

	var modelBinder, _private;

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
		this._modelToViewProxy = $.proxy(_private.modelToView, this);
		this.model.bind("change", this._modelToViewProxy);
		_private.init.call(this);
		return this;
	};

	ModelBinder.prototype = {
		model: null, // holds the model
		$el: null, 	// stores the container that is being bound
		bindings: {}, // stores binding elements by name (each value is an array of elements).

		updateEl: function (el, name, value) { // name and value are optional
			var binding, set, haveValue = value !== undefined;

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

			// if we have a binding name and the name attribute is not passed or is the same a s the binding name then update
			if (binding.name && (!name || binding.name === name)) {
				set = (config.types[binding.type] && config.types[binding.type].set) || config.types["default"].set;
				set.call(this, el, haveValue ? value : this.model.get(binding.name));
			}

			// set the attributes
			if (binding.attrs) {
				$.each(binding.attrs, $.proxy(function (attr, modelPropertyName) {
					var attrType, setter;

					if (!name || modelPropertyName === name) {
						attrType = config.attributes[attr] || config.attributes["default"];
						setter = config.attributeTypes[attrType];
						setter(el, attr, haveValue ? value : this.model.get(modelPropertyName));
					}
				}, this));
			}
		},

		unbind: function () {
			this.matches.unbind(".modelbinder");
			this.model.unbind("change", this._modelToViewProxy);
			this.$el.data("modelbound", false);
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
			    bindTo,
			    binding = { attrs: {}, binder: this },
			    changeEvent;

			el = $(el);
			attr = el.attr("data-bind");
			bindTo = nameValueParser.parse(attr, "value");
			if (("value" in bindTo) === false) {
				bindTo.value = el.attr("name") || el.attr("id");
			}
			$.each(bindTo, $.proxy(function (what, modelProperty) {
				var val = this.model.get(modelProperty);

				if (val === undefined) {
					return; // continue - do not add binding for an undefined attr
				}

				if (what.toLowerCase() === "value") { // value/type binding

					binding.name = modelProperty;
					binding.type = el.attr("data-type") || el.attr("type") || el[0].tagName.toLowerCase();

				} else { // attribute binding

					binding.attrs[what] = modelProperty;

				}

				_private.addBinding.call(instance, modelProperty, el); // add binding ref to model property
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
			var self = this;
			setTimeout(function () {
				_.each(self.bindings, function (binding, propName) {
					_.each(binding, function (el) {
						if (el.is(":text,:password,select")) {
							_private.viewToModel.call(self, el);
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
		}
	};

	return modelBinder;

};


context.module("bbext").service("modelBinder", ["$", "_", "modelBinderConfig", "nameValueParser", bbext.modelBinder = modelBinder]);