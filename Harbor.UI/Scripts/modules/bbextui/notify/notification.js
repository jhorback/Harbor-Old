/*
 * Methods
 *     show(message, attrs)
 *     showError(message, attrs)
 *     showOnDelay(message, attrs)
 *     close();
 *
 * Properites
 *     call - an object that provides curried versions of: show, showError, close, and set.
 *     Example:
 *         var notification = notify.showOnDelay("Updating user...");
 *         commandHandler.execute(...)
 *             .then(notification.call.show("User updated"));
 *
 * Events
 *     show - triggered when visible is set to true
 *     closed - triggered during close after the notification is removed from the collection.
 *     click // jch! - need to implement click
 */
bbext.notification = function (attrs, options, callbacks) {

	this.callbacks = callbacks;
};

bbext.notification.prototype = {
	defaults: {
		message: null,                 // the primary text
		details: null,                 // html for an optional details display
		visible: false, 
		timestamp: null,
		inProgress: false,
		timeout: 1000 * 60 * 5,        // 5 minutes - used in initialize
		delayTimeout: 1000,            // 1 second - used by showOnDelay
		iconClassName: "icon-complete" // can be: "icon-complete" or "icon-complete attn"
	},

	initialize: function () {
		this.set("timestamp", new Date().getTime());
		this.callbacks.create(this, "show", "showError", "close", "set");
		if (this.attributes.timeout) {
			setTimeout(this.call.close(), this.attributes.timeout);
		}
	},

	"[visible]": {
		set: function (value) {
			if (value === true) {
				this.trigger("show");
			}
			return value;
		}
	},

	show: function (message, attrs) {
		this.set(this._getAttrs(arguments, {
			visible: true,
			inProgress: false
		}));
	},

	showError: function (message, attrs) {
		this.set(this._getAttrs(arguments, {
			visible: true,
			inProgress: false,
			iconClassName: "icon-complete attn"
		}));
	},

	showOnDelay: function (message, attrs) {
		this.set(this._getAttrs(arguments, {
			visible: false,
			inProgress: true
		}));

		setTimeout(_.bind(function () {
			this.set("visible", true);
		}, this), this.attributes.delayTimeout);
	},

	close: function () {
		this.collection && this.collection.remove(this);
		this.trigger("close");
	},
	
	// helper for fn(message, attrs) signature
	_getAttrs: function (args, overrideArgs) {
		var message = args[0],
		    attrs = args[1];

		if (attrs) {
			attrs.message = message;
		} else {
			attrs = { message: message };
		}

		return _.extend(attrs, overrideArgs);
	}
};


bbext.model("bbext.notification", [
	"attrs",
	"options",
	"callbacks",
	bbext.notification
]);