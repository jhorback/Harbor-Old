/*
 * modelBinderConfig
 *     Type and attribute processing can be configured.
 *	
 *	   // eventFromDom, getFromDom, setToDom
 *     modelBinderConfig.types["foo"] = {
 *         event: "click",               // additional dom event(s) to listen on the element to update the model
 *         get: function (el, event, binding) { },       // a method to get the value out of the dom for the model
 *         set: function (el, value) { } // a method to set the value in the dom
 *     }
 *
 *     The type is determined from either data-type="...", type="...", <tagName/>
 *
 *
 *     modelBinderConfig.attributes["disabled"] = "boolean";
 *     modelBinderConfig.attributes["foo"] = "string";
 *     modelBinderConfig.attributeTypes["boolean"] = function (el, attr, value) { }; // a setter for the attribute
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
		"checklist": {
			get: function (el) {
				return el.val();
			},
			set: function (el, value) {
				el.val(value);
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
		},
		"option": {
			get: function (el) {
				return el.attr("value");
			},
			set: function (el, value) {
				el.attr("value", value);
			}
		}
	},

	attributes: {
		"default": "string",
		"id": "string",
		"disabled": "boolean",
		"checked": "boolean",
		"text": "text",
		"showif": "visibility",
		"dontshowif": "visibility",
		"val": "value" // uses el.val() 
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
		},
		"visibility": function (el, attr, value) {
			var initialDisplay = el.data("initialDisplay");
			if (!initialDisplay) { 
				initialDisplay = el.css("display");
				if (initialDisplay === "none") { // respect non block display
					el.show();
					initialDisplay = el.css("display");
					el.hide();
				}
				el.data("initialDisplay", initialDisplay);
			}
			attr === "showif" ?
				el.css("display", value ? initialDisplay : "none") :
				el.css("display", value ? "none" : initialDisplay); // dontshowif
		},
		"value": function (el, attr, value) {
			el.val(value);
		}
	}
};

context.module("bbext").register("modelBinderConfig", bbext.modelBinderConfig = modelBinderConfig);