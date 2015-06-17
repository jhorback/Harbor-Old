/** @memberof appui */
appui.string = function() {

	/** @lends appui.string.prototype */
	return {
		isNullOrEmpty: function(value) {
			return !value || !this.trim(value);
		},

		trim: function(str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},

		format: function() {
			var args = Array.prototype.slice.call(arguments, 0),
				str = args.shift();
			return str.replace(/{(\d+)}/g, function(match, number) {
				return typeof args[number] !== "undefined" ?
					args[number]
					: match;
			});
		},

		pluralize: function (res, count) {
			return count === 1 ? res.singular : res.plural.replace("{{count}}", count);
		}
	};

};

appui.service("string", appui.string);
