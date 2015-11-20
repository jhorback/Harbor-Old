/*
 *
 * Adds a postCommand method to a collection.
 *
 * collection.postCommand(commandName, [command])
 *     commandName - the name of the command (appended to the url of the collection for the command url)
 *     command - optional data to send as the command object
 *
 * Returns the xhr object from the Backbone sync method.
 *   
 * If an "ids" property does not exist on the command,
 *     all ids from the collection will be added.
 *
 * Example url: collection.postCommand("activate", {});
 *     If the collections url is: /api/users
 *     The command url will be: post: /api/users/activate
 *     Whith the post details including: "ids"
 * 
 */
bbext.postCommandColExt = function () {
	
	return {

		postCommand: function (commandName, command) {
			var url = _.result(this, "url") + "/" + commandName;

			command = command || {};

			// add the collection ids to the command if not present
			if (!command.ids) {
				command.ids = this.pluck(this.getIdAttribute());
			}

			return this.sync(commandName, this, {
				url: url,
				type: "POST",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(command)
			});
		}
	};
};


bbext.mixin("postCommandColExt", [
	bbext.postCommandColExt
]);
