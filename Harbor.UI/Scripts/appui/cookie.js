/*
  Allows for getting and setting a cookie.

  The cookie value can be any object.

  cookie set options:
  * expires - can be the number of days to expire, or a date
  * path - passed to the cookies path value.
  * domain - passed to the cookies domain value.
  * secure - if true, the cookie will only be set under HTTPS 
*/ 
appui.cookie = function (document) {

	return {
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
