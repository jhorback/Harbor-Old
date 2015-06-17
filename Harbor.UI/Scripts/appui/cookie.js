/*
  Allows for getting and setting a cookie.

  The cookie value can be any object.

  cookie set options:
  * expires - can be the number of days to expire, or a date
  * path - passed to the cookies path value.
  * domain - passed to the cookies domain value.
  * secure - if true, the cookie will only be set under HTTPS
*/
/** @module appui */
appui.cookie = function (document) {

    /** @name appui.cookie */
	return {
        /**
         * Sets a cookie with the provided name, value, and options. Empty value will force cookie expiration.
         * @param {string} name - the name of the cookie
         * @param {*=} [value] - the value of the cookie, to be stored as a JSON string
         * @param {object=} [options]
         * @param {Date|number|null=} [options.expires] - If a number, it specified days from now. If a date, that date.
         * @param {string=} [options.path] - passed to the cookie's path value
         * @param {string|null=} [options.domain] - adds an optional domain restriction to the cookie
         * @param {boolean=} [options.secure] - if true, the cookie will only be set under HTTPS
         */
		set: function (name, value, options) {
			var expires, date, path, domain, secure;

			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			expires = '';
			if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
				if (typeof options.expires === 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
			}

			path = options.path ? '; path=' + (options.path) : '';
			domain = options.domain ? '; domain=' + (options.domain) : '';
			secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(JSON.stringify(value)), expires, path, domain, secure].join('');
		},

        /**
         * Gets the value of any cookie with the provided name
         * @param {string} name
         * @returns {*} A JSON-parsed representation of the cookie value
         */
		get: function (name) {
			var cookieValue = null,
			    i = 0,
			    cookie;

			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (; i < cookies.length; i++) {
					cookie = jQuery.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return JSON.parse(cookieValue);
		}
	};
};

appui.service("cookie", ["document", appui.cookie]);
