/*
 * Provides for a global and named event channels.
 *
 * Global:
 *     events.on("eventName", fn);
 *     events.trigger("eventName", arg);
 *
 * Named:
 *     events("channelName").on("eventName", fn);
 *     events("channelName").trigger("eventName", arg);
 */
bbext.events = function (globalCache) {
	var events, channels, channel;

	channels = globalCache.track("bbextEventChannels", {});

	channel = function (name) {

		if (!channels[name]) {
			channels[name] = _.extend({}, Backbone.Events);
		}

		return channels[name];
	};

	events = globalCache.track("bbextEvents", function () {
		return _.extend(channel, Backbone.Events);
	});

	return events;
};


context.module("bbext").service("events", ["globalCache", bbext.events]);
