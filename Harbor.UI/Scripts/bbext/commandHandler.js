

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