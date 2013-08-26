/*
objects registered with the viewMixins services will be mixed
in the bbext.View construct.
These mixins can also define a beforeInit and afterInit methods
to be called exactly like the views initialize method is called.

Usage:
myAppOrModule.config(["viewMixins", function (viewMixins) {
	
	viewMixins.register({
		beforeInit: function () {
		},
		someMixinMethod: function () {
		}
	});

}]);
*/
var viewMixins = function (globalCache, _) {

	var storage = globalCache.get("viewMixins-storage") || {
		mixins: {},
		beforeInits: [],
		afterInits: [],
		sources: []
	};
	
	globalCache.set("viewMixins-storage", storage);
	
	return {
		register: function (name, mixin) {
			if (storage.mixins[name]) { // only register once
				return;
			}
			storage.mixins[name] = mixin;

			addInitCallback(storage.beforeInits, mixin, "beforeInit");
			addInitCallback(storage.afterInits, mixin, "afterInit");

			// mixin any View objects that have already been mixed in 
			_(storage.sources).each(function (source) {
				_.extend(source, mixin);
			});
		},

		mixin: function (source) {
			_(storage.mixins).each(function (mixin) {
				_.extend(source, mixin);
			});

			storage.sources.push(source);
		},

		beforeInit: function (instance, args) {
			initialize(storage.beforeInits, instance, args);
		},

		afterInit: function (instance, args) {
			initialize(storage.afterInits, instance, args);
		}
	};

	function initialize(callbacks, instance, args) {
		var context = instance.context;
		_(callbacks).each(function (initializer) {
			context.call(initializer, args, instance);
		});
	}

	function addInitCallback(callbacks, mixin, method) {
		if (mixin[method]) {
			callbacks.push(mixin[method]);
			delete mixin[method];
		}
	}
};

bbext.service("viewMixins", ["globalCache", "_", bbext.viewMixins = viewMixins]);