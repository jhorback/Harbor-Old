

// parses a string in the format "name: value, name: value"
// If name is ommited, the defaultName will be used.
// util method used by the eventBinder and modelBinder to parse data-event and data-bind attributes.
var nameValueParser = function ($) {

	return {
		parse: function (str, defaultName) {
			var parts, i, items = {};
			
			if (str === null || str === undefined) {
				return items;
			}

			parts = str.split(",");
			for (i = 0; i < parts.length; i++) {
				var parts2 = parts[i].split(":");
				if (parts2.length === 1) {
					items[defaultName] = $.trim(parts2);
				} else {
					items[$.trim(parts2[0])] = $.trim(parts2[1]);
				}
			}

			return items;
		}
	};
};

context.module("appui").service("nameValueParser", ["$", nameValueParser]);