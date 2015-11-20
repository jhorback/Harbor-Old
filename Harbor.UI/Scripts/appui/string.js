/** @memberof appui */
appui.string = function() {

	/** @lends appui.string.prototype */
	return {

        /**
         * Given a string, returns true if it's falsy or nothing but whitespace
         * @param {string} value
         * @returns {bool}
         */
		isNullOrEmpty: function(value) {
			return !value || !this.trim(value);
		},

        /**
         * Trims whitespace, including line breaks, from a string
         * @param {string} str
         * @returns {string}
         */
		trim: function(str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},

        /**
         * The classic string.format that uses numeric tokens - {0}..{n}
         * @param {string} formatString - the format string
         * @param {...*} tokens - values with which to replace the tokens in the format string
         * @returns {string}
         */
		format: function(formatString, tokens) {
			var args = Array.prototype.slice.call(arguments, 0),
				str = args.shift();
			return str.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] !== "undefined" ?
					args[number]
					: match;
			});
		},

        /**
         * Given an object with `singular` and `plural` string properties and a count, returns the singular version
         * for count 1 and the plural version for count > 1. The `plural` version should contain a {{count}} token.
         * @param {{singular:string,plural:string}} res
         * @param {number} count
         * @returns {string}
         * @example string.pluralize({singular:'location', plural: '{{count}} locations'}, 1) == 'location'
         * @example string.pluralize({singular:'location', plural: '{{count}} locations'}, 5) == '5 locations'
         */
		pluralize: function (res, count) {
			return count === 1 ? res.singular : res.plural.replace("{{count}}", count);
		},

        /**
         * Given any string, returns the same string but with the first character capitalized. Passing falsy values will
         * result in an empty string being returned.
         * @param {string} str
         * @returns {string}
         */
        firstCap: function(str) {
            if (!str) { return ''; }
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
	};

};

appui.service("string", appui.string);
