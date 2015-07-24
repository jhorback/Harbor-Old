
/*
Shim:
selector - If defined, the render method will only be called if the selector matches any elements.
matches: fn(el) - If defined, the result of the function (passed an element) will be the matches passed to render if any.
parse: fn(el) - The raw template root before caching.
render: fn(el, model, matches) - Given the final element and model to perform the shim
resolve: fn(el, model, matches) - Same as render, however, executes after render.
*/

appui.construct("shim", ["globalCache", function (globalCache) {

	var shims = globalCache.get("shims") || {};
	
	function register(name, construct) {
		shims[name] = construct;
		globalCache.set("shims", shims);
	}

	return function (name, construct) {

		register(name, construct);
		return construct;
	};
}]);


appui.service("shims", ["_", "timer", "globalCache", "context", function (_, timer, globalCache, context) {


	return {
		parse: function (el) {
			foreachShim(function (shim) { // jch* have a way to distinguish whether the shim needs rendering or parsing or both!?
				shim.parse && shim.parse(el);
			});
		},
		
		// returns a deferred resolved when all shims have been resolved
		render: function (el, model) {
			var dfds = [];

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


				if (matches.length > 0 || (!shim.selector && !shim.matches)) {
					shim.render && shim.render(el, model, matches);
					if (shim.resolve) {
						dfds.push(timer.wait().then(function () {
							shim.resolve(el, model, matches);
						}));
					}
				}
			});

			return timer.waitFor(dfds);
		}
	};


	function foreachShim(callback) {
		var shims = globalCache.get("shims");
		_(shims).each(function (construct, shimName) {
			var shim = context.get(shimName);
			callback(shim);
		});
	}

}]);
