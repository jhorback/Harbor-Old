/*
mixin is an idempotent function that returns an object that can be used
to register mixins and then mixin those with a constructor function.

It does not matter what is called first.
Example:
mixin("view").register({
	beforeInit: function () {},
	afterInit: function () {},
	someMixinMethod: function () {}
});
mixin("view").mixin(Backbone.View);
mixin("view").register({
	someOtherMixinMethod: function () {}
});

The mixins can be registered before and after the call to mixin.
*/
function mixin (globalCache, _, context) {

	var mixins = globalCache.get("mixins") || {};
	globalCache.set("mixins", mixins);

	return function (type) {
		var mixin;
		
		type = context.name + "-" + type;
		mixin = mixins[type];
		if (!mixin) {
			mixin = createMixin(type);
			mixins[type] = mixin;
		}
		return mixin;
	};
	
	// jch* make this a prototype
	// since there are instances for each mixin/each app context
	// would benifit some with memory if this was a prototype
	function createMixin(type) {
		var storage = {
			type: type,
			mixins: {},
			beforeInits: [],
			afterInits: [],
			sources: []
		};

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
					_.extend(source.prototype, mixin);
				});
			},

			// Call to mix all mixins with a single source
			mixin: function (source) {
				_(storage.mixins).each(function (mixin) {
					_.extend(source.prototype, mixin);
				});

				addSource(storage, source);
				return source;
			}
		};
	}
	
	function addSource(storage, source) {
		var ctor = source;

		source.prototype.constructor = function () {
			initialize(storage.beforeInits, this, arguments);
			ctor.apply(this, arguments);
			initialize(storage.afterInits, this, arguments);
		};
		
		storage.sources.push(source);
	}

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


bbext.service("mixin", ["globalCache", "_", "context", mixin]);
