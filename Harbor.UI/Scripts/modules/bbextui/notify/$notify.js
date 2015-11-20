/**
 * @memberof bbext
 * @param {bbext.collectionFactory} collectionFactory
 * @param {bbext.modelFactory} modelFactory
 * @param {appui.globalCache} globalCache
 * @returns {{message: Function, errorMessage: Function, progress: Function, model: *, extend: Function}}
 * @mixes bbext.notifyElement
 * @mixes bbext.notifyView
 */
bbext.notifiy = function(collectionFactory, modelFactory, globalCache) {

	var notifyModel = globalCache.get("notifyModel");
	if (!notifyModel) {
		notifyModel = modelFactory.create("bbext.notifyModel");
		globalCache.set("notifyModel", notifyModel);
	}

	return {	
        /**
         * Shows a "complete" notification with the provided message. Additional notification attributes can
         * be set at the same time by passing an optional attribute hash as the second param.
         * @param {string} message
         * @param {object=} [attrs]
         * @returns {bbext.notification}
         */
		message: function (message, attrs) {
			return callShowMethod("done", message, attrs);
		},
		
        /**
         * Shows a "complete" notification with the provided message. Additional notification attributes can
         * be set at the same time by passing an optional attribute hash as the second param.
         * @param {string} message
         * @param {object=} [attrs]
         * @returns {bbext.notification}
         */
		errorMessage: function (message, attrs) {
			return callShowMethod("error", message, attrs);
		},

        /**
         * Queues a "progress" notification to be shown with the provided message. Additional notification attributes can
         * be set at the same time by passing an optional attribute hash as the second param. The delay before showing
         * can be configured by setting the "delayTimeout" attribute.
         * @param {string} message
         * @param {object=} [attrs]
         * @returns {bbext.notification}
         */
		progress: function (message, attrs) {
			return callShowMethod("progress", message, attrs);
		},

		model: notifyModel,

        /**
         * Mixes the provided object into this notify service
         * @param extension
         */
		extend: function (extension) {
			_.extend(this, extension);
		}
	};

    /**
     * A generalized method to call notification model methods with identical param signatures
     * @param {string} method - the method to call on the notification model
     * @param {string} message - the message to display on the notification
     * @param {object=} [attrs] - an optional attribute hash to be set on the notification model at the same time
     * @private
     * @returns {bbext.notification}
     */
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

