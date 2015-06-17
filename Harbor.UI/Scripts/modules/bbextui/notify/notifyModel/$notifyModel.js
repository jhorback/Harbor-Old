


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
			}
			return classes.join(" ");
		},
		observe: ["showMenu", "notificationCount"]
	},

	visibleNotificationFilter: function (notification) {
		return notification.get("visible");
	},

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

