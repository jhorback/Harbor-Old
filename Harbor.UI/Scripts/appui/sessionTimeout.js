/*
 * sessionTimeout.js
 *
 * sessionTimeout
 *      start(logoutUrl, timeout);
 *      extend();
 */
context.module("appui").service("sessionTimeout", ["keepAlive", function (keepAlive) {

	var timeoutId = null;

	return {
		start: function (logoutUrl, keepAliveUrl, timeout) {

			this.logoutUrl = logoutUrl || this.logoutUrl;
			this.timeout = Math.max(timeout || this.timeout || (20 * 60 * 1000), 60000);

			keepAlive.stop();
			keepAlive.start(keepAliveUrl, (this.timeout / 2) - 10000); // stagger the keep alive request
			queueRequest(this.logoutUrl, this.timeout);
		},

		extend: function () {
			clearTimeout(timeoutId);
			this.start();
		}
	};

	function queueRequest(logoutUrl, timeout) {
		timeoutId = setTimeout(function () {
			$.ajax({
				url: logoutUrl,
				data: { sessionTimeout: true },
				dataType: "html"
			}).always(function () {
				var href = window.location.href.split("#")[0];
				window.location = $.trim(href);
			});
		}, timeout);
	}
}]);