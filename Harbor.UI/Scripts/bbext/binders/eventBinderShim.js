
/* 
 * eventBinder - shim [data-event]
 *     A shim used to add data-event="eventName: methodName, ..." attribute
 *     to the Backbone events on the view.
 */
function eventBinderShim($, nameValueParser) {
	this.$ = $;
	this.nameValueParser = nameValueParser;
};
	

eventBinderShim.prototype = {
	render: function (el, model) {
		var view = el.data("view"),
		    eventEls = el.find("[data-event]"),
		    bbEvents = {},
			$ = this.$,
		    nameValueParser = this.nameValueParser;

		eventEls.each(function (i, evEl) {
			var dataEvent, evs, selector;

			evEl = $(evEl);
			dataEvent = evEl.data("event");
			evs = nameValueParser.parse(dataEvent, "click");
			selector = "[data-event='" + dataEvent + "']";

			$.each(evs, function (name, value) {
				bbEvents[name + " " + selector] = value;
			});
		});

		view.events = view.events || {}; // make sure there is an events object
		$.extend(view.events, bbEvents);
		view.delegateEvents();
	}
};

context.module("bbext").shim("eventBinderShim", ["$", "nameValueParser", bbext.eventBinderShim = eventBinderShim]);