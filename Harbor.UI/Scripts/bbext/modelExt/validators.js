/*
 * validators.js
 *
 * Exposes and allows for the extension of model validation methods.
 *
 *     validators.add("exclude", function (value, args) {
 *         if (value === args) {
 *     	       retun "The value cannot be " + args;
 *         }
 *     };
 */
/**
 * @module bbext
 */
context.module("bbext").service("validators", ["string", function (string) {
	var validators;

	validators = {
		required: function (value, args) {
			var msg = (args && args.message) || "Required.";
			return string.isNullOrEmpty(value) ? msg : undefined;
		},

		email: function (value) {
			var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA;-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//			return (!string.isNullOrEmpty(value) && _.isString(value) && !value.match(emailRegex)) ?
//				"Invalid email." : undefined;
            return emailRegex.test(value) ? undefined : 'Invalid Email';
		},

        guid: function (value) {
            var guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            return guidRegex.test(value) ? undefined : 'Invalid Guid';
        },

        json: function (value) {
            try {
                JSON.parse(value);
            } catch (e) {
                return false;
            }
            return true;
        },

		custom: function (value, validator) {
			return validator(value);
		}
	};

	return {
		add: function (name, validator) {
			validators[name] = validator;
		},

		get: function (name) {
			return validators[name];
		}
	};

}]);
