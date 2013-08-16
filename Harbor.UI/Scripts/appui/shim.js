
var appui = context.module("appui");


appui.construct("shim", ["globalCache", function (globalCache) {

	var shims = globalCache.get("shims") || [];

	return function (construct, name) {

		register(name);
		if (!construct.prototype.render) {
			throw new Error("A shim must implement render");
		}
		return construct;
	};

	function register(name) {
		shims.push(name);
		globalCache.set("shims", shims);
	}
}]);


appui.service("shims", ["_", "globalCache", "context", function (_, globalCache, context) {

	return {
		render: function (el, model) {
			var shims = globalCache.get("shims");

			if (model && !model.toJSON) {
				throw new Error("The model must implement toJSON.");
			}

			_(shims).each(function (shimName) {
				var shim = context.get(shimName);
				shim.render(el, model);
			});
		}
	};

}]);