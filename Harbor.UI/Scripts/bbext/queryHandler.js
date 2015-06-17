/*
 * Wraps the model.fetch call in an ajaxRequest handler.
 *
 * queryHandler.fetch(model, [query], [handler], [context]);
 *     model - the model or collection to call fetch on.
 *     query - the data to pass as the query. If this object has a 'data' property,
 *         it will be passed directly as the fetch argument to allow defining other parameters.
 *     handler - the handler to use for the ajaxRequest
 *     context - the context to use for the handler callbacks
 *
 * can also be called using an options object
 *     options: { model:, collection:, params:, handler:, context:, <any fetch or ajax options> }
 */
/**
 * @memberof bbext
 * @requires appui.ajaxRequest
 * @constructor
 */
bbext.queryHandler = function (ajaxRequest) {
    return {
        /**
         * Wraps the model.fetch call in an ajaxRequest handler.
         * @param {Backbone.Model|Backbone.Collection} model - the model or collection to call fetch on
         * @param {object?} query - the data to pass as the query. If this object has a 'data' property,
         *     it will be passed directly as the fetch argument to allow defining other parameters.
         * @param {object.<string,function>?} handler - the handler to use for the ajaxRequest
         * @param {object=} [context] - the context to use for the handler callbacks
         * @returns promise
         */
		fetch: function (model, params, handler, context) {
			var options = {},
				toFetch;

			if (model instanceof Backbone.Model || model instanceof Backbone.Collection) {
				toFetch = model;				
				options.data = params;
				options.handler = handler;
				options.context = context;

			} else {
				options = arguments[0];
				options.data = options.params;
				toFetch = options.model || options.collection;
			}
			
			return ajaxRequest.handle(toFetch.fetch(options), options.handler, options.context);
		}
	};
};

bbext.service("queryHandler", [
	"ajaxRequest",
	bbext.queryHandler
]);
