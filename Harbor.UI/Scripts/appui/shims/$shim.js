/*
shim construct:
	selector - can be a string, function, or object
		string - selector for render
		function(el) - a function to return matching elements within the el
		object - { parse: string|fn, render: string|fn} - use when defining a parse method.

	parse: fn(el, shims) - Allows for modifying the raw template before caching; must define a parse selector.
	render: fn(el, model, matches) - Given the final element and model to perform the shim
	resolve: fn(el, model, matches) - Same as render, however, executes after render.
*/


/* shims service */
appui.shims = function (timer, console, context) {
	
	// selector can be a string, function, or object
	// if an object - keys are "parse" and "render"
	// the values can be a string or a function.
	function getMatches(el, shim, forParse) {
		var matches, selector;

		if (forParse) {

			return getMatchesFromSelector(el, shim.selector.parse);
		} else {
		
			if (_.isString(shim.selector) || _.isFunction(shim.selector)) {
				return getMatchesFromSelector(el, shim.selector);
			} else {
				return getMatchesFromSelector(el, shim.selector.render);
			}
		}
	}


	function getMatchesFromSelector(el, selector) {
		var matches;
		if (_.isFunction(selector)) {
			matches = selector(el);
		} else {
			matches = el.find(selector).addBack(selector);
		}
		return matches;
	}

	function getShim(name) {
		var shim = context.get("shim: " + name);
		if (!shim) {
			throw new Error("Shim not registered: " + name);
		}
		return shim;
	}


	return {
		register: function (name, construct) {
			console.log("Registering shim:", name);
			context.register("shim: " + name, construct);
		},

		addToView: function (viewConstruct, shims) {
			viewConstruct.prototype.shims = viewConstruct.prototype.shims ?
				_.union(viewConstruct.prototype.shims, shims) :
				shims;
		},

		parse: function (el, shimsToParse) {
			_.each(shimsToParse, function (shimName) {
				var shim = getShim(shimName),
					matches;

				if (!shim.parse) {
					return;
				}

				matches = getMatches(el, shim, true);
				if (matches.length > 0) {
					shim.parse(el, matches);
				}
			});
		},
		
		// returns an array of shim names that will be needed for the view
		determineShimsForRender: function (el, shimsToTest) {
			var forRender = [];
			_.each(shimsToTest, function (shimName) {
				var shim = getShim(shimName),
					matches;

				if (!shim.render && !shim.resolve) {
					return;
				}

				matches = getMatches(el, shim, false);
				if (matches.length > 0) {
					forRender.push(shimName);
				}
			});

			return forRender;
		},

		// returns a deferred resolved when all shims have been resolved
		render: function (el, model, shimsToRender) {
			var dfds = [];

			// console.debug("shimsToRender", shimsToRender, el.data("view").name);
			_.each(shimsToRender, function (shimName) {
				var shim = getShim(shimName),
					matches = getMatches(el, shim, false);

				shim.render && shim.render(el, model, matches);
				if (shim.resolve) {
					dfds.push(timer.wait().then(function () {
						shim.resolve(el, model, matches);
					}));
				}
			});

			return timer.waitFor(dfds);
		}
	};
};

appui.service("shims", [
	"timer",
	"console",
	"context",
	appui.shims
]);


appui.shimConstruct = function (shims) {
	return function (name, construct) {
		// constructs are called for every app
		shims.register(name, construct);
		return construct;
	};
};

appui.construct("shim", [
	"shims",
	appui.shimConstruct
]);