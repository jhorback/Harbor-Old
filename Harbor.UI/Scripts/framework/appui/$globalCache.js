
function globalCache(globals) {
    globals.globalCache = globals.globalCache || {};
    /**
     * Provides a single global cache object under which any value can be stored
     * @alias appui.globalCache
     */
    return {
        /**
         * Returns the specified property from the global cache
         * @param {string} name
         * @returns {*}
         */
        get: function (name) {
            return globals.globalCache[name];
        },

        /**
         * Sets the specified value in the global cache using the specified name as the key
         * @param {string} name
         * @param {*} value
         */
        set: function (name, value) {
            globals.globalCache[name] = value;
        },

		track: function (name, initialValue) {
			var val = this.get(name);
			if (!val) {
				val = _.isFunction(initialValue) ? initialValue() : initialValue;
				this.set(name, val);
			}
			return val;
		}
    };
}

context.module("appui").service("globalCache", ["globals", globalCache]);