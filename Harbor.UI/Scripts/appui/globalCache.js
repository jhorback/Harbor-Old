
function globalCache(globals) {
    globals.globalCache = globals.globalCache || {};

    return {
        get: function (name) {
            return globals.globalCache[name];
        },
        set: function (name, value) {
            globals.globalCache[name] = value;
        }
    };
}

context.module("appui").service("globalCache", ["globals", globalCache]);