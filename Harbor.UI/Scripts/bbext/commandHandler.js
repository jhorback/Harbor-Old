/*
 * Enables command execution on a model or collection.
 * 
 * commandHandler.execute(model, commandName, [command], [handler], [context])
 *     model - the model or collection to execute the command on. Uses the model.postCommand model/collection extension method.
 *     commandName - the command name to execute. This is appended to the models url to determine the commands url.
 *     command - on object to send as data which represents the command object
 *     handler - an object passed to the ajaxRequest to handle specific success, failure, or http codes.
 *     context - a binding context to be passed to the handler callback methods.
 *
 *     Returns an xhr promise.
 *
 *     See the postCommand model/collection extension methods for full details.
 *          Mainly how the ids and urls are handled
 *
 *
 * commandHandler.deleteModel(model, options, handler, context)
 *     Calls model.destroy(options) wrapped in the ajaxRequest object
 *     which submits a delete verb to the model url - see Backbone.
 *     Returns the xhr promise from the Backbone.Model destroy call.
 *
 *
 * commandHandler.saveModel(model, attrs, options, handler, context)
 *     Calls model.save(attrs, options) wrapped in the ajaxRequest object
 *     which can submit a post, put, or patch verb to the model url - see Backbone.
 *     Returns the xhr promise from the Backbone.Model save call.
 */
bbext.commandHandler = function (ajaxRequest) {
	return {
		execute: function (model, commandName, command, handler, context) {
			return ajaxRequest.handle(model.postCommand(commandName, command), handler, context);
		},

		deleteModel: function (model, options, handler, context) {
			return ajaxRequest.handle(model.destroy(options), handler, context);
		},

		saveModel: function (model, attrs, options, handler, context) {
			return ajaxRequest.handle(model.save(attrs, options), handler, context);
		}
	};
};

bbext.service("commandHandler", [
	"ajaxRequest",
	bbext.commandHandler
]);