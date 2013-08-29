
/*
Shim:
selector - If defined, the render method will only be called if the selector matches any elements.
matches: fn(el) - If defined, the result of the function (passed an element) will be the matches passed to render if any.
parse: fn(el) - The raw template root before caching.
render: fn(el, model, matches) - Given the final element and model to perform the shim
resolve: fn(el, model, matches) - Same as render, however, executes after render.
*/

appui.construct("shim", ["globalCache", function (globalCache) {

	var shims = globalCache.get("shims") || [];
	
	function register(name) {
		shims.push(name);
		globalCache.set("shims", shims);
	}

	return function (name, construct) {

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
					matches = el.find(shim.selector).addBack(shim.selector);
					if (matches.length === 0) {
						return;
					}
				}
				if (shim.matches) {
					matches = shim.matches(el);
				}
				
				shim.render && shim.render(el, model, matches);
				shim.resolve && setTimeout(function () {
					shim.resolve(el, model, matches);
				}, 0);
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