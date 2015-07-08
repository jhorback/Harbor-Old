(function () {
	
	context.app("session").config([
		"ajaxRequestDefaultHandler",
		"feedback",
	function extendAjaxRequestDefaultHandler(ajaxRequestDefaultHandler, feedback) {

		ajaxRequestDefaultHandler.extend({
			401: function (response) {
				//var returnUrl = window.location.pathname + window.location.search;
				//window.location = Session.url("User/SignIn?returnUrl=") + returnUrl;
				feedback.show(response);
			},

			404: function (response) {
				feedback.show(response);
				// createErrorView(404, response);
			},

			error: function (response) {
				feedback.show(response);
				// createErrorView(500, response);
			}
		});
	}]);
})();



