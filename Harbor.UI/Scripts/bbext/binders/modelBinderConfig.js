
/*
 * ModelBinder.config:
 *     Type and attribute processing can be configured.
	
		// eventFromDom, getFromDom, setToDom
 *     ModelBinder.config.types["foo"] = {
 *         event: "click",               // additional dom event(s) to listen on the element to update the model
 *         get: function (el, event, binding) { },       // a method to get the value out of the dom for the model
 *         set: function (el, value) { } // a method to set the value in the dom
 *     }
 *     ModelBinder.config.attributes["disabled"] = "boolean";
 *     ModelBinder.config.attributes["foo"] = "string";
 *     ModelBinder.config.attributeTypes["boolean"] = function (el, attr, value) { }; // a setter for the attribute
 */
var modelBinderConfig = {
	types: {
		"default": {
			// event: default is change - which triggers a get from dom to update the model
			// set is listening to model changes
			get: function (el) { // get from dom
				return el.val();
			},
			set: function (el, value) { // set to dom
				el.is(":input") ? el.val(value) : el.html(String(value));
			}
		},
		"checkbox": {
			get: function (el) {
				return el.is(":checked");
			},
			set: function (el, value) {
				el.attr("checked", value);
			}
		},
		"contenteditable": {
			event: ["keydown", "blur"],
			get: function (el, event, binding) {
				var val = this.model.get(binding.name);
				if (event.type === "keydown") {
					if (event.keyCode == 27) { // escape
						setTimeout(function () {
							el.blur();
						}, 0);
						el.text(val);
					} else if (event.keyCode == 13) { // enter
						el.blur();
						val = el.text();
						el.text(val);
					}
				} else { // event is blur
					val = el.text();
				}
				// console.log(event.type, val);
				return val;
			},
			set: function (el, value) {
				el.html(value);
			}
		},
		"multicheckbox": {
			get: function (el) {
				var name = el.attr("name");
				var selected = this.$el.find("[name='" + name + "']:checked");
				var roles = _.map(selected, function (el) {
					return $(el).attr("value");
				});
				return roles;
			},
			set: function (el, value) {

				var elValue = el.val();
				var checked = _.any(value, function (value) {
					return elValue === value;
				});
				el.attr("checked", checked);
			}
		},
		"radio": {
			set: function (el, value) {
				el.attr("checked", el.val() === value);
			}
		}
	},

	attributes: {
		"id": "string",
		"disabled": "boolean",
		"checked": "boolean",
		"class": "string",
		"href": "string",
		"text": "text",
		"src": "string"
	},
	
	attributeTypes: { // attributeBinders
		"string": function (el, attr, value) {
			el.attr(attr, value);
		},
		"boolean": function (el, attr, value) {
			if (!value) {
				el.removeAttr(attr);
			} else {
				el.attr(attr, true);
			}
		},
		"text": function (el, attr, value) {
			el.html(value);
		}
	}
};

context.module("bbext").register("modelBinderConfig", modelBinderConfig);