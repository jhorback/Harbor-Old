

bbext.queryHandler = function (ajaxRequest) {


	return {
		execute: function (model, query, handler, context) {
			return ajaxRequest.handle(model.fetch({ data: query }), handler, context);
		}
	};


};

bbext.service("queryHandler", [
	"ajaxRequest",
	bbext.queryHandler
]);