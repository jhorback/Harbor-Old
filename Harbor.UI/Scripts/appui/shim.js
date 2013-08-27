
/*
A shim must have a render method.
A shim can have a selector property. If defined, the render method will only be called
if the selector matches any elements.
*/

appui.construct("shim", ["globalCache", function (globalCache) {

	var shims = globalCache.get("shims") || [];
	
	function register(name) {
		shims.push(name);
		globalCache.set("shims", shims);
	}

	return function (construct, name) {

		register(name);
		return construct;
	};
}]);


appui.service("shims", ["_", "globalCache", "context", function (_, globalCache, context) {


	return {
		parse: function (el) {
			foreachShim(function (shim) {
				shim.parse && shim.parse(el);
			});
		},
		
		render: function (el, model) {
			if (model && !model.toJSON) {
				throw new Error("The model must implement toJSON.");
			}

			foreachShim(function (shim) {
				var matches = [];
				if (shim.selector) {
					matches = el.find(shim.selector);
					if (matches.length === 0) {
						return;
					}
				}
				shim.render && shim.render(el, model, matches);
			});
		}
	};


	function foreachShim(callback) {
		var shims = globalCache.get("shims");
		_(shims).each(function (shimName) {
			var shim = context.get(shimName);
			callback(shim);
		});
	}

}]);