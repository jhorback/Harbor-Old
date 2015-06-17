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
 *     or define options: {model:, collection:, commandName:, command:, handler:, context:, }
 *
 * commandHandler.deleteModel(model, options, handler, context)
 *     Calls model.destroy(options) wrapped in the ajaxRequest object
 *     which submits a delete verb to the model url - see Backbone.
 *     Returns the xhr promise from the Backbone.Model destroy call.
 *
 *     or define options: {model:, collection:, handler:, context:, <any destroy options>} 
 *
 * commandHandler.saveModel(model, options, handler, context)
 *     Calls model.save(null, options) wrapped in the ajaxRequest object
 *     which can submit a post, put, or patch verb to the model url - see Backbone.
 *     Returns the xhr promise from the Backbone.Model save call.
 *
 *     or define options: {model:, collection:, handler:, context:, <any save options>}
 */
/**
 * @memberof bbext
 * @param ajaxRequest
 */
bbext.commandHandler = function (ajaxRequest) {
    /** @lends bbext.commandHandler.prototype */
	return {

        /**
         * Execute any arbitrary command on the server
         * @param {Backbone.Model|Backbone.Collection|{commandName,command,handler,context}} model - the model or collection to execute the command on. Uses the
         *   model.postCommand model/collection extension method. Can also be an options object with properties matching the params of this method.
         * @param {string} commandName - the command name to execute. This is appended to the models url to determine the commands url.
         * @param {string=} [command] - an optional object to send as data which represents the command object
         * @param {object=} [handler] - an object passed to the ajaxRequest to handle specific success, failure, or http codes.
         * @param {function|object=} [context] - a binding context to be passed to the handler callback methods.
         * @returns {promise}
         */
		execute: function (model, commandName, command, handler, context) {
			var options = {},
				toCommand;
			
			if (model instanceof Backbone.Model || model instanceof Backbone.Collection) {
				toCommand = model;
				options.commandName = commandName;
				options.command = command;
				options.handler = handler;
				options.context = context;
			} else {
				toCommand = options.model || options.collection;
			}

			return ajaxRequest.handle(toCommand.postCommand(options.commandName, options.command), options.handler, options.context);
		},

        /**
         * Calls model.destroy(options) wrapped in the ajaxRequest object which submits a delete verb to
         * the model url - see Backbone. Returns the xhr promise from the Backbone.Model destroy call. Can be
         * called "longhand" or can be called with one options param with properties matching the other params of this method.
         * @param {Backbone.Model|Backbone.Collection} model
         * @param {{model:Backbone.Model,collection:Backbone.Collection,handler:function,context:object|function}} options
         * @param {object=} [handler]
         * @param {object|function=} [context]
         * @returns {promise}
         */
		deleteModel: function (model, options, handler, context) {
			var toDelete;

			options = options || {};

			if (model instanceof Backbone.Model || model instanceof Backbone.Collection) {
				toDelete = model;
				options.handler = handler;
				options.context = context;
			} else {
				toDelete = options.model || options.collection;
			}

			return ajaxRequest.handle(toDelete.destroy(options), options.handler, options.context);
		},

        /**
         * Calls model.save(null, options) wrapped in the ajaxRequest object which can submit a post, put, or patch verb to the model url - see Backbone.
         * Can be called longhand or with a single options object with properties matching the other params of this method.
         * @param {Backbone.Model|Backbone.Collection} model - the model to save
         * @param {{model:Backbone.Model,collection:Backbone.Collection,handler:function,context:function|object}} options
         * @param {object=} [handler]
         * @param {object|function=} [context]
         * @returns {promise}
         */
		saveModel: function (model, options, handler, context) {
			var saveMthod, toSave;

			options = options || {};

			if (model instanceof Backbone.Model || model instanceof Backbone.Collection) {
				toSave = model;
				options.handler = handler;
				options.context = context;
			} else {
				toSave = options.model || options.collection;
			}

			saveMthod = toSave.safeSave || toSave.save;

			return ajaxRequest.handle(saveMthod(null, options), options.handler, options.context);
		}
	};
};

bbext.service("commandHandler", [
	"ajaxRequest",
	bbext.commandHandler
]);