

bbext.events = function (globalCache) {

	var events = globalCache.get("bbextEvents");
	if (!events) {
		events = _.extend({}, Backbone.Events);
		globalCache.set("bbextEvents", events);
	}
	
	return events;
};


context.module("bbext").service("events", ["globalCache", bbext.events]);