


bbext.notifiy = function(collectionFactory, modelFactory, globalCache) {

	var notifyModel = globalCache.get("notifyModel");
	if (!notifyModel) {
		notifyModel = modelFactory.create("bbext.notifyModel");
		globalCache.set("notifyModel", notifyModel);
	}

	return {	
		message: function (message, attrs) {
			return callShowMethod("done", message, attrs);
		},
		
		errorMessage: function (message, attrs) {
			return callShowMethod("error", message, attrs);
		},

		progress: function (message, attrs) {
			return callShowMethod("progress", message, attrs);
		},

		model: notifyModel,

		extend: function (extension) {
			_.extend(this, extension);
		}
	};

	function callShowMethod(method, message, attrs) {
		var notification = modelFactory.create("bbext.notification");
		notification[method](message, attrs);
		notifyModel.notifications.add(notification);
		return notification;
	}
};


bbext.service("notify", [
	"collectionFactory",
	"modelFactory",
	"globalCache",
	bbext.notifiy
]);

