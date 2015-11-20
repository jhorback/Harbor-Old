/**
 * A backbone collection used as a store for notifications, which are sorted by their timestamps
 * @memberof bbext
 * @constructor
 * @param {Array.<Backbone.Model>?} models
 * @param {object?} options
 */
bbext.notifications = function (models, options) {

};

bbext.notifications.prototype = {
	model: "bbext.notification",

	initialize: function() {
		this.on("change:timestamp", function() {
			this.sort();
		});
	},

	comparator: function(notification) {
		return notification.attributes.timestamp * -1;
	}
};

bbext.collection("bbext.notifications", [
	"models",
	"options",
	bbext.notifications
]);