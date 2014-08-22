

bbext.commandHandler = function (ajaxRequest) {
	return {
		execute: function (model, commandName, command, handler, context) {
			var xhr = ajaxRequest.handle(model.postCommand(commandName, command), handler, context);

			xhr.then(function (resp) {
				var serverAttrs = model.parse(resp, {});
				model.set(serverAttrs);
			});

			return xhr;
		}
	};
};

bbext.service("commandHandler", [
	"ajaxRequest",
	bbext.commandHandler
]);