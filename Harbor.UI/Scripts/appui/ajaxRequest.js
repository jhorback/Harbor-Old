/*
 * Description:
 *    Provides for the handling of ajax calls in a consistant manner and through http codes
 *    allowing you to override them at the view level where neccessary.
 * 
 * Response handler:
 *     handler: {
 *         success: fn,
 *         clientError: fn,
 *         error: fn,
 *         401: fn,
 *         405: fn
 *         // any status code...
 *     }
 */
appui.ajaxRequest = function ($, defaultHandler, console) {

	/* Default ajax handling */
	$.ajaxSetup({ dataType: "json" });

	return {
		handle: function (deferred, handler, proxy) {
			/// <summary>A static version to handle deferreds.</summary>
			var dfdHandler;
			console.trace("ajaxRequest.handle");
			handler = $.extend({ }, defaultHandler, handler);
			dfdHandler = getDeferredHandler(handler, proxy);
			deferred.then(dfdHandler.success);
			deferred.fail(dfdHandler.error);
			return deferred.promise();
		},
		
		// util method to return a resolved promise object
		resolved: function () {
			var dfd = $.Deferred();
			dfd.resolve();
			return dfd.promise();
		}
	};
	
	function getDeferredHandler (responseHandler, proxy) {
		/// <summary>Translates success and error callbacks to a responseHandler.</summary>
		proxy = proxy || this;

		return {
			success: function (response, status, xhr) {
				(responseHandler[xhr.status] || responseHandler.success).apply(proxy, arguments);
			},
			error: function (xhr) {
				var status = parseInt(xhr.status);
				if (status === 400 && responseHandler.clientError) {
					responseHandler["400"] = responseHandler.clientError;
				}
				callHandlerCallbackFromError(responseHandler[xhr.status] || responseHandler.error).apply(proxy, arguments);
			}
		};
	}
	
	function callHandlerCallbackFromError(callback) {
		/// <summary>Curry for an xhr response, callback(response, xhr) - the response is the JSON parsed response.</summary>
		return function (xhr) {
			var response;
			try {
				response = JSON.parse(xhr.responseText);
			} catch (e) {
				response = xhr && xhr.statusText;
			}
			callback.call(this, response, xhr);
		};
	}
};


appui.service("ajaxRequest", ["$", "ajaxRequestDefaultHandler", "console", appui.ajaxRequest]);




appui.ajaxRequestDefaultHandler = {
	401: function (response) {
		alert("Unauthorized. " + response);
	},

	404: function (response) {
		alert("Resource not found. " + response);
	},

	success: function (response) {
		// noop
	},

	error: function (response) {
		alert("Internal server error. " + response);
	},

	extend: function (handler) {
		$.extend(this, handler);
	}
};

module("appui").register("ajaxRequestDefaultHandler", appui.ajaxRequestDefaultHandler);