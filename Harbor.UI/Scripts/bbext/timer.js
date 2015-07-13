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
/**
 * @module bbext
 * @name bbext.timer
 * @param {jquery} $
 * @returns {{wait: function, waitFor: function}}
 */
function timer($) {

	return {
        /**
         * Returns a promise that resolves after the specified amount of time
         * @param {number} time
         * @returns {promise}
         */
		wait: function (time) {
			time = time || 0;
			return $.Deferred(function(dfd) {
				setTimeout(dfd.resolve, time);
			}).promise();
		},

        /**
         * Given an array of deferred objects, returns a promise that resolves when
         * all of the array's deferreds have resolved.
         * @param {Array.<promise>} deferreds
         * @returns {promise}
         */
		waitFor: function (deferreds) {
			return $.when.apply($, deferreds);
		},

		/*
		 * Calls the callback with the given context with a setTimeout 0.
		 */
		yield: function(callback, context) {
			setTimeout(_.bind(callback, context), 0);
		},


		transitionTo: function (el, className) {
			var dfd = $.Deferred();
			setTimeout(function () {
				$(el).addClass(className);
				dfd.resolve();
			}, 25);
			return dfd.promise();
		},

		transitionFrom: function (el, className) {
			var dfd = $.Deferred();
			$(el).removeClass(className);
			setTimeout(function () {
				dfd.resolve();
			}, 300);
			return dfd.promise();
		}
	};

}

context.module("bbext").service("timer", ["$", timer]);
