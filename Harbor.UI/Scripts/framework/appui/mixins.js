/*
    mixins service
	    mixins.register(name, mixin)
	    mixins.map(alias, mixins) // deprecated
	    mixins.mixin(proto, mixins)

    mixin construct
        yourApp.mixin("mixinName", fn) - fn is an injected function that returns the mixin

	For constructs that use the mixins service, a mixins array can be defined
	on the prototype to add additional mixins.
	    myView.prototype.mixins = ["mixin1", "mixin2"];
*/
appui.mixins = function (globalCache, context) {
	"use strict";

	var store = globalCache.get("appui.mixins") || {
		mapped: {},
		keyed: {},
		mixins: {} // a name cache for mapping
	};

	globalCache.set("appui.mixins", store);


	function getMappedAndUniqueMixins(mixins) {
		var mapped = [];
		_.each(mixins, function (mixin) {
			if (store.mixins[mixin]) {
				mapped.push(mixin);
			} else if (store.mapped[mixin]) {
				_.each(store.mapped[mixin], function (mixin) {
					mapped.push(mixin);
				});
			} else {
				throw new Error("Unregisterd mixin: " + mixin);
			}
		});
		return _.unique(mapped);
	}

	function getCachedMappedMixins(mixins) {
		var key = JSON.stringify(mixins);
		if (store.keyed[key]) {
			mixins = store.keyed[key];
		} else {
			mixins = getMappedAndUniqueMixins(mixins);
			store.keyed[key] = mixins;
		}
		return mixins;
	}

	function lastDefinedValue(values) {
		var i;
		values.reverse();
		for (i = 0; i < values.length; i++) {
			if (values[i] !== void(0)) {
				return values[i];
			}
		}
		return void(0);
	}

	function wrap(fn, before, after) {
		return function () {
			var ret = [];
			before && ret.push(before.apply(this, arguments));
			fn && ret.push(fn.apply(this, arguments));
			after && ret.push(after.apply(this, arguments));
			return lastDefinedValue(ret);
		}
	}

	function mixinSource(mixin, proto) {
		_.each(mixin, function (value, name) {
			if (name === "ctor") {
				proto.constructor = wrap(proto.constructor, value.before, value.after);
			} else if (value && (value.before || value.after)) {
				proto[name] = wrap(proto[name], value.before, value.after);
			} else {
				proto[name] = value;
			}
		});
	}

	function getMixin(name) {
		return context.get("mixin:" + name);
	}

	return {
		register: function (name, mixin) {
			store.mixins[name] = true;
			context.register("mixin:" + name, mixin);
		},

		map: function (alias, mixins) {
			store.mapped[alias] = getMappedAndUniqueMixins(mixins);
		},

		mixin: function (proto, mixins) {
			mixins = _.compact(_.union(mixins, proto.mixins));
			if (mixins.length === 0) {
				return proto;
			}

			mixins = getCachedMappedMixins(mixins);

			_.each(mixins, function (mixinName) {
				mixinSource(getMixin(mixinName), proto);
			});

			return proto;
		}
	};
};

appui.service("mixins", [
	"globalCache",
	"context",
	appui.mixins
]);




appui.mixinsConstruct = function (mixins) {

	return function (name, construct) {
		mixins.register(name, construct);
		return construct;
	};
};

appui.construct("mixin", [ // rename old mixin then remove when done
	"mixins",
	appui.mixinsConstruct
]);
