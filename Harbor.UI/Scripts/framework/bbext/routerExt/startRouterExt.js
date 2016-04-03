/*
 * Adds a start method to the router.
 *     start(options) - calls the Backbone history start method 
 *                      with the provided options (also setting the root
 *                      and pushState options to true).
 * 
 * Note: Backbone route urls are case sensitive which is to spec but can cause problems 
 *     when fat fingering URLs. This could be coded around if deemed neccessary.
 *     The current solution is to try a lowercase path as long as the root matches.
 **/
bbext.startRouterExt = function (console) {
    var optionalParam = /\((.*?)\)/g;
    var namedParam = /(\(\?)?:\w+/g;
    var splatParam = /\*\w+/g;
    var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	return {
	    start: function (options) {
	        var foundRoute,
                lowerPath;

			options = _.extend({
				pushState: true,
				root: this.root
			}, options);

		    foundRoute = Backbone.history.start(options);
		    if (!foundRoute) {
		        lowerPath = location.pathname.toLowerCase();
		        if (lowerPath.indexOf(this.root.substring(0, this.root.length - 1)) === 0) {
		            document.location = lowerPath + location.search;
		        } else {
		            console.warn("Router root mismatch.");
		        }
		    }
	    },

	    // jch - override the _routeToRegExp for case insensitive routes
	    _routeToRegExp: function (route) {
            route = route.replace(escapeRegExp, '\\$&')
                         .replace(optionalParam, '(?:$1)?')
                         .replace(namedParam, function (match, optional) {
                             return optional ? match : '([^/?]+)';
                         })
                         .replace(splatParam, '([^?]*?)');
            return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$', 'i');
        }
	};
};

bbext.mixin("startRouterExt", [
    "console",
	bbext.startRouterExt
]);