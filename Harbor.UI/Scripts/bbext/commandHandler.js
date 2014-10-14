/*
 * Enables command execution on a model.
 * 
 * commandHandler.execute(model, commandName, [command], [handler], [context])
 *     model - the model to execute the command on. Uses the model.executeCommand model extension method.
 *     commandName - the command name to execute. This is appended to the models url to determine the commands url.
 *     command - on object to send as data which represents the command object
 *     handler - an object passed to the ajaxRequest to handle specific success, failure, or http condes.
 *     context - a binding context to be passed to the handler callback methods.
 *
 */
bbext.commandHandler = function (ajaxRequest) {
	return {
		execute: function (model, commandName, command, handler, context) {
			var xhr = ajaxRequest.handle(model.postCommand(commandName, command), handler, context);

			xhr.then(function (resp) {
				var options = {},
					serverAttrs = model.parse(resp, options);
				model.set(serverAttrs);
				model.trigger('sync', model, resp, options);
			});

			return xhr;
		}
	};
};

bbext.service("commandHandler", [
	"ajaxRequest",
	bbext.commandHandler
]);