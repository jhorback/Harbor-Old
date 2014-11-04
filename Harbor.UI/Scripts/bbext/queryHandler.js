/*
 * Wraps the model.fetch call in an ajaxRequest handler.
 *
 * queryHandler.fetch(model, [query], [handler], [context]);
 *     model - the model or collection to call fetch on.
 *     query - the data to pass as the query. If this object has a 'data' property,
 *         it will be passed directly as the fetch argument to allow defining other parameters.
 *     handler - the handler to use for the ajaxRequest
 *     context - the context to use for the handler callbacks
 */
bbext.queryHandler = function (ajaxRequest) {
	return {
		fetch: function (model, query, handler, context) {
			if (query && !query.data) {
				query = { data: query};
			}
			return ajaxRequest.handle(model.fetch(query), handler, context);
		}
	};
};

bbext.service("queryHandler", [
	"ajaxRequest",
	bbext.queryHandler
]);