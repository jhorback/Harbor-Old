

// parses a string in the format "name: value, name: value"
// If name is ommited, the defaultName will be used.
// util method used by the eventBinder and modelBinder to parse data-event and data-bind attributes.
var nameValueParser = function ($) {

	return {
		parse: function (str, defaultName) {
			var parts = str.split(","),
			    i, items = [];

			for (i = 0; i < parts.length; i++) {
				var parts2 = parts[i].split(":");
				if (parts2.length === 1) {
					items.push({ name: defaultName, value: $.trim(parts2) });
				} else {
					items.push({ name: $.trim(parts2[0]), value: $.trim(parts2[1]) });
				}
			}

			return items;
		}
	};
};

context.module("bbext").service("nameValueParser", ["$", bbext.nameValueParser = nameValueParser]);