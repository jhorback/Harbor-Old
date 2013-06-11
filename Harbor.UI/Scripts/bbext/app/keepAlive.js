/*
 * keepAlive.js
 *
 */
module("bbext").service("keepAlive", ["$", function ($) {

	var timeoutId = null;
	
	return {
		start: function (url, timeout) {
			
			timeout = timeout || (10 * 60 * 60);
			queueRequest();
			
			function queueRequest() {
				timeoutId = setTimeout(function () {
					$.get(url);
					queueRequest();
				}, timeout);
			}
		},
		stop: function () {
			clearTimeout(timeoutId);
		}
	};
}]);