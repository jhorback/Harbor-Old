/*
 * Methods
 *     done(message, attrs)
 *     error(message, attrs)
 *     progress(message, attrs)
 *     close();
 *
 * Properites
 *     call - an object that provides curried versions of: done, error, progress, close, and set.
 *     Example:
 *         var notification = notify.showOnDelay("Updating user...");
 *         commandHandler.execute(...)
 *             .then(notification.call.show("User updated"));
 *
 * Events
 *     show - triggered when visible is set to true
 *     closed - triggered during close after the notification is removed from the collection.
 *     click // jch* implement click?
 */
bbext.notification = function (attrs, options, callbacks) {

	this.callbacks = callbacks;
};

bbext.notification.prototype = {
	defaults: {
		id: null,
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
		// this.bindAll("updateTimestamp");

		this.set("id", this.cid);
		this.updateTimestamp();
		this.callbacks.create(this, "done", "error", "progress", "close", "set");
		if (this.attributes.timeout) {
			setTimeout(this.call.close(), this.attributes.timeout);
		}

		this.on("change:message change:visible change:inProgress", this.updateTimestamp);
		this.on("change:inProgress", function() {
			this._timerId && clearTimeout(this._timerId);
		});
	},

	"[visible]": {
		set: function (value) {
			if (value === true) {
				this.trigger("show");
			}
			return value;
		}
	},

	done: function (message, attrs) {
		this.set(this._getAttrs(arguments, {
			visible: true,
			inProgress: false,
			iconClassName: "icon-complete"
		}));
	},

	error: function (message, attrs) {
		this.set(this._getAttrs(arguments, {
			visible: true,
			inProgress: false,
			iconClassName: "icon-error"
		}));
	},

	progress: function (message, attrs) {
		this.set(this._getAttrs(arguments, {
			visible: false,
			inProgress: true,
			iconClassName: "notify-pending"
		}));

		this._timerId = setTimeout(_.bind(function () {
			this.set("visible", true);
		}, this), this.attributes.delayTimeout);
	},

	order: 0,

	updateTimestamp: function() {
		var ts = new Date().getTime();
		this.set("timestamp", ts);
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