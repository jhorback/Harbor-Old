/**
 * A model used by the notify service to manage notifications
 * @memberof bbext
 * @constructor
 * @param {object?} attrs
 * @param {object?} options
 */
bbext.notifyModel = function (attrs, options) {

};

bbext.notifyModel.prototype = {
	defaults: {
		hasNotifications: false,
		hasMultipleNotifications: false,
		notificationCount: 0,
		showMenu: false,
		menuAnchorClassName: ""
	},

	initialize: function() {
		this.notifications = this.createCollection("bbext.notifications");
		this.visibleNotifications = this.notifications.getFiltered(this.visibleNotificationFilter, ["change:visible"]);

		this.listenTo(this.visibleNotifications, "add remove", this.updateHasMultipleAndCount);
	},

	"[menuAnchorClassName]": {
		get: function() {
			var classes = [];
			if (this.attributes.showMenu) {
				classes.push("open");
			}
			if (this.attributes.notificationCount) {
				classes.push("attn");
			} else {
				classes.push("hide");
			}
			return classes.join(" ");
		},
		observe: ["showMenu", "notificationCount"]
	},

    /**
     * Used as a filter to get only visible notifications
     * @param {bbext.notification} notification
     * @returns {boolean}
     */
	visibleNotificationFilter: function (notification) {
		return notification.get("visible");
	},

    /**
     * Updates the "hasNotifications", "hasMultipleNotifications", and "notificationCount" attributes. Triggered
     * when notifications are added or removed from the collection
     */
	updateHasMultipleAndCount: function () {
		this.set("hasNotifications", this.visibleNotifications.length > 0);
		this.set("hasMultipleNotifications", this.visibleNotifications.length > 1);
		this.set("notificationCount", this.visibleNotifications.length);
	}
};

bbext.model("bbext.notifyModel", [
	"attrs",
	"options",
	bbext.notifyModel
]);

