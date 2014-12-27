/*
 * Adds a postCommand method to a model.
 *
 * model.postCommand(commandName, [command])
 *     commandName - the name of the command (appended to the url of the model for the command url)
 *     command - optional data to send as the command object
 *
 * Returns the xhr object
 *     Also uses the response of the request to sync the server attributes
 *     if the model is returned in the command response.
 *
 * The command object is ensured to have the id of the model.
 *
 * Example url: model.postCommand("bar");
 *     If the model url is: /api/foo and the model id is 5
 *     The command url will be: post: /api/foo/5/bar 
 *
 */
function postCommandModelExt(mixin) {
	
	var extension = {
		postCommand: function (commandName, command) {
			var root, url, id, xhr, model = this;

			root = _.result(this, "urlRoot") || _.result(this, "url") || (this.collection && _.result(this.collection, "url"));
			if (!root) {
				throw new Error("A url is required for postCommand.");
			}

			id = this.get("id");
			url = id ? root + "/" + id + "/" + commandName : root + "/" + commandName;
			command = command || {};
			command.id = id;
		
			xhr = this.sync(commandName, this, {
				url: url,
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(command)
			});

			// reset the model properties from the server response
			xhr.then(function (resp) {
				var options = {},
				    serverAttrs;

				if (!resp) {
					return;
				}
				serverAttrs = model.parse(resp, options);
				model.set(serverAttrs);
				model.trigger('sync', model, resp, options);
			});

			return xhr;
		}
	};

	mixin("model").register("bbext.postCommandModelExt", extension);
};


bbext.config(["mixin", postCommandModelExt]);