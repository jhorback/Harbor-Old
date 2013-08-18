﻿

var eventBinder = (function () {

	function eventBinder ($) {

		this.$ = $;
	};
	

	eventBinder.prototype = {
		render: function (el, model) {
			var view = el.data("view");
			var eventEls = el.find("[data-event]");
			var bbEvents = {};
			var $ = this.$;

			eventEls.each(function (i, evEl) {
				var dataEvent, evs, selector;

				evEl = $(evEl);
				dataEvent = evEl.data("event");
				evs = parseEvents($, dataEvent);
				selector = "[data-event='" + dataEvent + "']";

				$.each(evs, function (j, ev) {
					bbEvents[ev.event + " " + selector] = ev.method;
				});
			});

			view.events = view.events || {}; // make sure there is an events object
			$.extend(view.events, bbEvents);
			view.delegateEvents();
		}
	};

	// click: methodName, mouseOver: methodName

	function parseEvents($, attr) {
		var parts = attr.split(","),
			i, evs = [];

		for (i = 0; i < parts.length; i++) {
			var parts2 = parts[i].split(":");
			if (parts2.length === 1) {
				evs.push({ event: "click", method: $.trim(parts2) });
			} else {
				evs.push({ event: $.trim(parts2[0]), method: $.trim(parts2[1]) });
			}
		}
		return evs;
	}
	
	return eventBinder;
}());


context.module("bbext").shim("eventBinder", ["$", eventBinder]);