

bbext.commandHandler = function (ajaxRequest) {
	return {
		execute: function (model, commandName, command, handler, context) {
			ajaxRequest.handle(model.postCommand(commandName, command), handler, context);
		}
	};
};

bbext.service("commandHandler", [
	"ajaxRequest",
	bbext.commandHandler
]);