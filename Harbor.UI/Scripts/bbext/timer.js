/*
 * Methods:
 *     NOTE: All methods return a jQuery deferred object.
 *
 *     wait(time) - waits the number of seconds before resolving.
 *         time is 0 by default.
 *         Example: timer.wait().then(fn) - or timer.wait(2000).then(fn)
 * 
 *     waitFor(deferreds) - waits for all of the deffereds in the array to resolve.
 */

function timer($) {
	return {
		wait: function (time) {
			time = time || 0;
			return $.Deferred(function(dfd) {
				setTimeout(dfd.resolve, time);
			});
		},

		waitFor: function (deferreds) {
			return $.when.apply($, deferreds);
		}
	};
};

context.module("bbext").service("timer", ["$", timer]);