/*
 * Supports template > [data-view] || [data-view] when using the viewRenderer
 * 
 * The rootViewCache looks first in its cache then in the dom
 *     to return a template el that has not had it's child views parsed.
 *
 * An unparsed template is one that has not had its child data-view elements
 *     cached off by the template/view cache and has not had shim parsing.
 */
bbext.rootViewCache = function (globalCache) {
    var rootViews = globalCache.track("bbext.rootViews", {});

    return {
        get: function (name) {
            var el = rootViews[name]; 
            return el ? el : this.cache(name, $("[data-view='" + name + "']"));
        },

        cache: function (name, el) {
            if (el.length !== 1) {
                return null;
            }
            rootViews[name] = el;
            el.remove();
            return el;
        }
    };
};


bbext.service("rootViewCache", [
	"globalCache",
	bbext.rootViewCache
]);
