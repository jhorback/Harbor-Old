(function () {
	AjaxRequest.defaultHandler.extend({
		401: function (response) {
			var returnUrl = window.location.pathname + window.location.search;
			window.location = Session.url("User/SignIn?returnUrl=") + returnUrl;
		},
				
		404: function (response) {
			createErrorView(404);
		},
				
		error: function (response) {
			createErrorView(500, {
				model: new Backbone.Model(response)
			});
		}
	});

	var createErrorView = function (errorCode, options) {
		/// <summary>errorCode can be 404 or 500</summary>
		var view = new Session.ErrorView(_.extend({
			el: $("#frame-body"),
			errorCode: errorCode
		}, options));
	};
})();