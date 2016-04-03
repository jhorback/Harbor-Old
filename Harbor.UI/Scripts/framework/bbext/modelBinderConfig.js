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
				el.is(":input") ? el.val(value) : el.html('' + value);
			}
		},
		"checkbox": {
			get: function (el) {
				return el.is(":checked");
			},
			set: function (el, value) {
				el.prop("checked", value);
			}
		},
		"contenteditable": {
			event: ["keydown", "blur"],
            options: {
                // If true, the element will blur (Become unfocused) when the enter key is pressed
                'bluronenter': true
            },
			get: function (el, event, binding) {
				var val = this.model.get(binding.name),
                    options = binding.options;
				if (event.type === "keydown") {
					if (event.keyCode == 27) { // escape
						setTimeout(function () {
							el.blur();
						}, 0);
						el.text(val);
					} else if (event.keyCode == 13 && options.bluronenter) { // enter
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
				el.prop("checked", checked);
			}
		},
		"radio": {
		    get: function (el) {
		        var name = el.attr("name");
		        var selected = this.$el.find("[name='" + name + "']:checked");

		        return selected.val();
		    },
		    set: function (el, value) {
		        el.prop("checked", el.val() == value);  //using a 'loose equality' because the underling html value returns a string
                                                        //when the intention is numeric
		    }
		},
		"option": {
			get: function (el) {
				return el.attr("value");
			},
			set: function (el, value) {
				el.attr("value", value);
			}
		},
        "date": {
            get: function (el) {
                var dateString = el.val(),
                    val = new Date(),
                    parts = dateString.split('-');
                val.setFullYear(parts[0]);
                val.setMonth(parts[1]);
                val.setDate(parts[2]);
                return val;
            },
            set: function (el, value) {
                var dateString, month, day;
                if (!(value instanceof Date)) {
                    value = new Date(value);
                }
                month = '' + value.getMonth();
                month = month.length === 1 ? '0'+month : month;
                day = '' + value.getDate();
                day = day.length === 1 ? '0'+day : day;
                dateString = [value.getFullYear(), month, day].join('-');
                el.val(dateString);
            }
        },
        "datepicker": {
            get: function($el) {
                if ($el.is('.hasDatepicker')) {
                    return $el.datepicker('getDate');
                }
                return null;
            },
            set: function($el, value) {
                if (!(value instanceof Date)) {
                    value = new Date(value);
                }
                if ($el.is('.hasDatepicker')) {
                    $el.datepicker('setDate', value);
                }
            }
        }
	},

	attributes: {
		'default': 'default',
		'id': 'string',
		'disabled': 'boolean',
        'enabled': 'enable',
		'checked': 'property',
        'contenteditable': 'boolean',
		'text': 'text',
		'showif': 'visibility',
		'dontshowif': 'visibility',
		'val': 'value', // uses el.val()
		"class": "class"
	},

	attributeTypes: { // attributeBinders
	    "default": function (el, attr, value) {
	        if ((value === true || value === false) && attr.indexOf("data-") !== 0) {
	            modelBinderConfig.attributeTypes.boolean(el, attr, value);
	        } else {
	            modelBinderConfig.attributeTypes.string(el, attr, value);
	        }
	    },
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
        "property": function(el, prop, value) {
            el.prop(prop, value);
        },
		"readonly": function(el, prop, value) {
			if (value) {
				el.removeAttr('readonly')
					.prop('readonly', false)
					.removeClass('readonly');
			} else {
				el.attr('readonly', true)
					.prop('readonly', true)
					.addClass('readonly');
			}
		},
        "enable": function (el, attr, value) {
            if (value) {
                el.removeAttr('disabled aria-disabled')
                    .prop({
                        disabled: false,
                        'aria-disabled': false
                    })
                    .removeClass('disabled ui-state-disabled');
            } else {
                el.attr({
                        'disabled': true,
                        'aria-disabled': true
                    })
                    .prop({
                        disabled: true,
                        'aria-disabled': true
                    })
                    .addClass('disabled ui-state-disabled');
            }
        },
		"text": function (el, attr, value) {
			el.html(value);
		},
		"visibility": function (el, attr, value) {
			attr === "showif" ?
				el.css("display", !!value ? "" : "none") :
				el.css("display", !!value ? "none" : ""); // dontshowif
		},
		"value": function (el, attr, value) {
			el.val(value);
		},
		"class": function (el, attr, value) {
			var staticClasses = el.data("staticClasses");
			if (staticClasses === void(0)) {
				staticClasses = el.attr("class") || "";
				el.data("staticClasses", staticClasses);
			}
			value = value ? staticClasses + " " + value : staticClasses || "";
			el.attr("class", value);
		}
	}
};

context.module("bbext").register("modelBinderConfig", bbext.modelBinderConfig = modelBinderConfig);
