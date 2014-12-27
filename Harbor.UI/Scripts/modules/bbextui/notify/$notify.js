


bbext.notifiy = function (collectionFactory, modelFactory) {

	var notifications = collectionFactory.create("bbext.notifications");

	return {	
		show: function (message, attrs) {
			return callShowMethod("show", message, attrs);
		},
		
		showError: function (message, attrs) {
			return callShowMethod("showError", message, attrs);
		},

		showOnDelay: function (message, attrs) {
			return callShowMethod("showOnDelay", message, attrs);
		},

		getNotifications: function () {
			return notifications;
		},

		extend: function (extension) {
			_.extend(this, extension);
		}
	};

	function callShowMethod(method, message, attrs) {
		var notification = modelFactory.create("bbext.notification");
		notification[method](message, attrs);
		notifications.add(notification);
		return notification;
	}
};


bbext.service("notify", [
	"collectionFactory",
	"modelFactory",
	bbext.notifiy
]);

